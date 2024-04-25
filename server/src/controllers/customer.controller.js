import { ORDER_STATUS } from '../configs/enum.config.js';
import responseHandler from '../handlers/response.handler.js';
import nodemailer from "nodemailer";
import voucherModel from '../models/voucher.model.js';
import customerModel from '../models/customer.model.js';
import bookingModel from '../models/booking.model.js';
import photographerModel from '../models/photographer.model.js';
import * as dotenv from 'dotenv';
dotenv.config();

const sendEmailCheckout = async (req, res) => {
     try {

          const { photo, service_package, total_price, location, photo_session } = req.body;
          console.log(photo)

          const senderEmail = process.env.EMAIL_ADDRESS;
          const emailPassword = process.env.EMAIL_PASSWORD;

          const transporter = nodemailer.createTransport({
               host: "smtp.gmail.com",
               port: 587,
               secure: false,
               auth: {
                    user: senderEmail,
                    pass: emailPassword,
               },
          });



          // Construct the HTML email template (for better readability)
          const htmlContentForCustomer = `
         <!DOCTYPE html>
         <html lang="en">
         <head>
             <meta charset="UTF-8">
             <meta name="viewport" content="width=device-width, initial-scale=1.0">
             <title>PHOBYPHO Booking Confirmation</title>
             <style>
                 /* Optional styling for a more professional look */
                 body {
                     font-family: sans-serif;
                 }
                 table {
                     border-collapse: collapse;
                 }
                 td, th {
                     padding: 5px;
                     border: 1px solid #ddd;
                 }
             </style>
         </head>
         <body>
             <h2>PHOBYPHO Booking Confirmation</h2>
             <p>Thân Gửi Quý Khách Hàng:  ${req.account.displayName},</p>
             <p>Cảm ơn bạn đã tin tưởng và lựa chon dịch vụ của chúng tôi. Chúng tôi sẽ liên hệ với bạn sớm để xác nhận thông tin lịch hẹn ❤️. </p>
   
             <h3>Chi tiết lịch hẹn</h3>
             <table>
                 <tbody>
                     <tr>
                         <th>Tên thợ chụp ảnh:</th>
                         <td>${photo.account.displayName || 'N/A'}</td> </tr>
                     <tr>
                         <th>Gói dịch vụ:</th>
                         <td>${service_package.name || 'N/A'}</td> </tr>
                     <tr>
                         <th>Địa điểm:</th>
                         <td>${location}</td>
                     </tr>
                     <tr>
                         <th>Ngày & giờ:</th>
                         <td>${photo_session || 'N/A'}</td> </tr>
                     <tr>
                         <th>Thành Tiền:</th>
                         <td>${total_price}</td>
                     </tr>
                 </tbody>
             </table>
               <p> Chúc bạn có một trải nghiệm chụp ảnh tuyệt vời và có những bước ảnh thật sự hài lòng nhé ❤️ !</p>
             <p>Trân Trọng Cảm Ơn !</p>
             <p>PHOBYPHO : ${senderEmail}</p>
         </body>
         </html>
               `;


          const htmlContentForPhotographer = `
                                   <!DOCTYPE html>
                                   <html lang="en">
                                   <head>
                                   <meta charset="UTF-8">
                                   <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                   <title>PHOBYPHO Booking Notification</title>
                                   <style>
                                        /* Optional styling for a more professional look */
                                        body {
                                             font-family: sans-serif;
                                        }
                                        table {
                                             border-collapse: collapse;
                                        }
                                        td, th {
                                             padding: 5px;
                                             border: 1px solid #ddd;
                                        }
                                   </style>
                                   </head>
                                   <body>
                                   <h2>PHOBYPHO Booking Notification</h2>
                                   <p>Xin chào ${photo.account.displayName || 'Photographer'},</p>
                                   <p>Bạn đã có một lịch hẹn mới từ PHOBYPHO. Vui lòng kiểm tra chi tiết bên dưới nhé 💖!</p>
                                   
                                   <h3>Chi tiết lịch hẹn</h3>
                                   <table>
                                        <tbody>
                                             <tr>
                                                  <th>Tên khách hàng:</th>
                                                  <td>${req.account.displayName || 'N/A'}</td>
                                             </tr>
                                             <tr>
                                                  <th>Dịch vụ đặt:</th>
                                                  <td>${service_package.name || 'N/A'}</td>
                                             </tr>
                                             <tr>
                                                  <th>Địa điểm:</th>
                                                  <td>${location}</td>
                                             </tr>
                                             <tr>
                                                  <th>Ngày & giờ:</th>
                                                  <td>${photo_session || 'N/A'}</td>
                                             </tr>
                                             <tr>
                                                  <th>Thành tiền:</th>
                                                  <td>${total_price}</td>
                                             </tr>
                                        </tbody>
                                   </table>
                                   
                                   <p>Xin vui lòng xác nhận lại thông tin và sẵn sàng cho buổi chụp. 
                                   Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi ngay nhé ❤️.</p>
                                   
                                   <p>Trân trọng,</p>
                                   <p>PHOBYPHO</p>
                                   </body>
                                   </html>
                     `;


          const mailOptionsForCustomer = {
               from: {
                    name: "PHOBYPHO",
                    address: 'hoduy8701@gmail.com',
               },
               to: req.account.email,
               subject: "PHOBYPHO Thank you for your booking",
               html: htmlContentForCustomer,
          };

          const mailOptionsForPhotographer = {
               from: {
                    name: "PHOBYPHO",
                    address: 'hoduy8701@gmail.com',
               },
               to: photo.account.email,
               subject: "PHOBYPHO Booking Notification",
               html: htmlContentForPhotographer,
          };


          let resultForCustomer = await transporter.sendMail(mailOptionsForCustomer);
          let resultForPhotographer = await transporter.sendMail(mailOptionsForPhotographer);

          console.log("Email sent to customer: %s", resultForCustomer.messageId);
          console.log("Email sent to photographer: %s", resultForPhotographer.messageId);

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

const updateCustomerPoints = async (customerId) => {
     try {
          const customer = await customerModel.findOne({ account: customerId });

          if (!customer) {
               throw new Error('Không tìm thấy tài khoản này !');
          }

          customer.accumulated_points += 1000;
          await customer.save();
     } catch (error) {
          throw new Error("Error updating customer points: " + error.message);
     }
};

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
               photographerName: photo.account.displayName,
               customer: account._id,
               location: location,
               servicePackageId: service_package._id,
               servicePackageName: service_package.name,
               booking_date: photo_session,
               status: ORDER_STATUS.pending,
               total_price: total_price
          });

          await booking.save();
          await updateCustomerPoints(account._id);

          await sendEmailCheckout(req, res);

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




export default {
     createNewBooking, getCustomerBooking,
     getCustomerByAccountId, updatePoints,
     getCustomerVouchers, sendEmailCheckout, 
     getCustomerBookingByPhotoId
};