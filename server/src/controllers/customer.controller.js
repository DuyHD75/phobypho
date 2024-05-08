import { ORDER_STATUS, ROLES_LIST } from '../configs/enum.config.js';
import responseHandler from '../handlers/response.handler.js';
import nodemailer from "nodemailer";
import voucherModel from '../models/voucher.model.js';
import customerModel from '../models/customer.model.js';
import bookingModel from '../models/booking.model.js';
import photographerModel from '../models/photographer.model.js';
import * as dotenv from 'dotenv';
dotenv.config();

import EmailUtils from '../utils/email.util.js';




const transporter = nodemailer.createTransport({
     host: "smtp.gmail.com",
     port: 587,
     secure: false,
     auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD,
     },
});


const emailCheckoutSender = async (req, res) => {
     try {

          const { photo, service_package, total_price, location, photo_session } = req.body;
          const senderEmail = process.env.EMAIL_ADDRESS;


          const customerEmailMessage = EmailUtils.getCustomerEmailContent(
               req.account.displayName, photo.account.displayName, service_package.name,
               location, photo_session, total_price);

          const photographerEmailMessage = EmailUtils.getPhotographerEmailContent(
               req.account.displayName, photo.account.displayName, service_package.name,
               location, photo_session, total_price);

          const mailOptionsForCustomer = EmailUtils.mailOptions(
               senderEmail, req.account.email, customerEmailMessage, EmailUtils.SUBJECT.checkout.CUSTOMER
          );

          const mailOptionsForPhotographer = EmailUtils.mailOptions(
               senderEmail, photo.account.email, photographerEmailMessage, EmailUtils.SUBJECT.checkout.PHOTOGRAPHER
          )

          let senderCustomerResult = await transporter.sendMail(mailOptionsForCustomer);

          let senderPhotographer = await transporter.sendMail(mailOptionsForPhotographer);

          console.log("Email sent to customer: %s", senderCustomerResult.messageId);
          console.log("Email sent to photographer: %s", senderPhotographer.messageId);

     } catch (error) {
          console.error('Error sending email:', error);
          return responseHandler.error(res, {
               message: `Failed to send email: ${error.message}`,
          });
     }
};

const getBookingById = async (bookingId) => {

     try {
          const booking = await bookingModel.findById(bookingId);

          if (!booking) {
               return responseHandler.notfound(res, { message: 'Không tìm thấy lịch hẹn!' }, 'Không tìm thấy lịch hẹn!');
          }

          return booking;
     } catch (error) {
          return error
     }
}

const emailCancelBookingSender = async (req, res) => {
     try {
          const { bookingId } = req.params;
          const { cancelFee } = req.body;

          const booked = await getBookingById(bookingId);

          const senderEmail = process.env.EMAIL_ADDRESS;



          const cancelBookingMessage = EmailUtils.getCancelBookingMessage(
               req.account.displayName, booked.photographerName, booked.servicePackageName,
               booked.location, booked.booking_date, booked.total_price, cancelFee, ROLES_LIST.CUSTOMER);

          const cancelMailOptionCustomer = EmailUtils.mailOptions(
               senderEmail, req.account.email, cancelBookingMessage, EmailUtils.SUBJECT.cancel
          );

          const cancelMailOptionPhotographer = EmailUtils.mailOptions(
               senderEmail, booked.photographerEmail, cancelBookingMessage, EmailUtils.SUBJECT.cancel
          )

          let senderCustomerResult = await transporter.sendMail(cancelMailOptionCustomer);
          let senderPhotographer = await transporter.sendMail(cancelMailOptionPhotographer);

          console.log("Email sent to customer: %s", senderCustomerResult.messageId);
          console.log("Email sent to photographer: %s", senderPhotographer.messageId);

     } catch (error) {
          console.error('Error sending email:', error);
          return responseHandler.error(res, {
               message: `Failed to send email: ${error.message}`,
          });
     }
};


const checkVoucherAndUpdateCustomer = async (account, voucher_code) => {
     const voucher = await voucherModel.findOne({ code: voucher_code });
     if (!voucher) {
          throw new Error('Mã voucher không hợp lệ');
     }

     const customer = await customerModel.findOne({ account: account._id });
     if (!customer.vouchers.includes(voucher._id)) {
          throw new Error('Bạn không có quyền sử dụng mã voucher này !');
     }

     customer.vouchers = customer.vouchers.filter((v) => v.toString() !== voucher._id.toString());

     await customer.save();
};

const updateCustomerPoints = async (customerId, price) => {
     try {
          const customer = await customerModel.findOne({ account: customerId });

          if (!customer) {
               throw new Error('Không tìm thấy tài khoản này !');
          }

          customer.accumulated_points += (price / 1000);
          await customer.save();
     } catch (error) {
          throw new Error("Error updating customer points: " + error.message);
     }
};


const updatePhotographerBookingCount = async (photographerId) => {
     try {
          const photo = await photographerModel.findOne({ account: photographerId });
          if (!photo) throw new Error("Không tìm thấy tài khoản này !");
          photo.bookingCount += 1;
          await photo.save();
     } catch (error) {
          throw new Error("Error updating photographer booking count: " + error.message);
     }
}

const createNewBooking = async (req, res) => {
     try {
          const { account } = req;

          const { photo, service_package, total_price, location, photo_session, voucher_code } = req.body;

          console.log(voucher_code)
          if (voucher_code) {
               await checkVoucherAndUpdateCustomer(account._id, voucher_code);
          }

          const booking = new bookingModel({
               photo: photo.id,
               poster: photo.poster,
               photographer: photo.author,
               photographerName: photo.account.displayName,
               photographerEmail: photo.account.email,
               customer: account._id,
               location: location,
               servicePackageId: service_package._id,
               servicePackageName: service_package.name,
               booking_date: photo_session,
               status: ORDER_STATUS.pending,
               total_price: total_price
          });

          await booking.save();
          await updateCustomerPoints(account._id, total_price);

          await updatePhotographerBookingCount(photo.author);

          await emailCheckoutSender(req, res);

          // booking count >=10 && nam trong 1 quy <=> reset booking count

          return responseHandler.created(res, booking);
     } catch (error) {
          responseHandler.error(res, error.message);
     }
};

const getCustomerBooking = async (req, res) => {
     try {
          const { customerId } = req.params;

          const bookingList = await bookingModel.find({ customer: customerId });

          return responseHandler.ok(res, bookingList);
     } catch (error) {
          return responseHandler.error(res, "Fetching all booking: " + error);
     }
};

const getCustomerBookingByPhotoId = async (req, res) => {
     try {
          const { photoId } = req.params;

          const bookingList = await bookingModel.find({ customer: req.account.id, photo: photoId });

          return responseHandler.ok(res, bookingList);
     } catch (err) {
          return responseHandler.error(res, "Fetching booking by photoId: " + err);
     }
}

const getCustomerByAccountId = async (req, res) => {
     try {
          const customer = await customerModel.findOne({ account: req.account.id });
          if (!customer) {
               return responseHandler.notfound(res, { message: 'Customer not found' }, 'Customer not found');
          }
          return responseHandler.ok(res, customer);
     } catch (error) {
          return responseHandler.error(res, error.message)
     }
}

const updatePoints = async (req, res) => {
     try {
          const { customerId, points } = req.body;
          const customer = await customerModel.findById(customerId);
          if (!customer) {
               return res.status(404).json({ message: 'Customer not found' });
          }
          await customer.updatePoints(points);
          return responseHandler.ok(res, customer);
     } catch (error) {
          return responseHandler.error(res, "Error updating points: " + error);
     }
}


const getCustomerVouchers = async (req, res) => {
     try {

          const { account } = req;
          const vouchers = await customerModel.findOne({ account: account._id }).populate('vouchers');

          if (vouchers) {
               return responseHandler.ok(res, vouchers);
          }
     } catch (err) {
          return responseHandler.error(res, "Error getting all vouchers: " + err);
     }
}

const updateBookingStatus = async (req, res) => {
     try {
          const { bookingId } = req.params;
          const { status, cancelFee } = req.body;

          const booking = await bookingModel.findById(bookingId);
          if (!booking) {
               return responseHandler.notfound(res, { message: 'Không tìm thấy lịch hẹn!' }, 'Không tìm thấy lịch hẹn!');
          }

          booking.status = ORDER_STATUS[status.toLowerCase()];
          await booking.save();

          if (booking.status === ORDER_STATUS.cancelled) {
               await emailCancelBookingSender(req, res);
          }


          return responseHandler.ok(res, booking);

     } catch (error) {
          return responseHandler.error(res, "Lỗi cập nhật trạng thái: " + error.message);
     }
}




export default {
     createNewBooking, getCustomerBooking,
     getCustomerByAccountId, updatePoints,
     getCustomerVouchers, emailCheckoutSender,
     getCustomerBookingByPhotoId, updateBookingStatus
};