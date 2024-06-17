import responseHandler from "../handlers/response.handler.js";
import bookingModel from "../models/booking.model.js";
import customerModel from "../models/customer.model.js";
import photographerModel from "../models/photographer.model.js";
import accountModel from "../models/account.model.js";
import { ROLES_LIST } from "../configs/enum.config.js";

const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId, status } = req.body;

    const booking = await bookingModel.findById(bookingId);
    if (!booking) return responseHandler.notfound(res);

    booking.status = status;
    await booking.save();

    responseHandler.ok(res, booking);
  } catch {
    console.error("Error in booking.controller.updateBookingStatus");
    responseHandler.error(res);
  }
};
const getAllCustomers = async (req, res) => {
  try {
    const customers = await accountModel.find({ role: ROLES_LIST.customer });
    responseHandler.ok(res, customers);
  } catch {
    console.error("Error in admin.controller.getAllCustomers");
    responseHandler.error(res);
  }
};

const getAllPhotographers = async (req, res) => {
  try {
    const photographers = await accountModel.find({
      role: ROLES_LIST.photographer,
    });
    responseHandler.ok(res, photographers);
  } catch {
    console.error("Error in admin.controller.getAllPhotographers");
    responseHandler.error(res);
  }
};
const getBookings = async (req, res) => {
    const limit = parseInt(req.query.limit);
    const skip  = parseInt(req.query.skip);
    let bookings;
    if (limit) {
      bookings = await bookingModel.find().sort({ date: -1 }).skip(skip).limit(limit);
    } else {
      bookings = await bookingModel.find();
    }
    const bookingCount = bookings.length;
    res.json({
        bookings,
        bookingCount
    });
  };
const getBookingsByPhotographer = async (req, res) => {
    try {
        const { photographerId } = req.params;
        const bookings = await bookingModel.find({ photographer: photographerId });
        responseHandler.ok(res, bookings);
    } catch (error){
        console.error("Error in admin.controller.getBookingsByPhotographer");
        responseHandler.error(res);
    }
}
const searchBookingsByStatus = async (req, res) => {
    try {
        const { status } = req.query;
        const bookings = await bookingModel.find({ status });
        responseHandler.ok(res, bookings);
    } catch (error){
        console.error("Error in admin.controller.searchBookingsByStatus");
        responseHandler.error(res);
    }
}

const getAllBookingsByDate = async (req, res) => {
    const date = new Date(req.params.date);
    date.setHours(0, 0, 0, 0);
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);

    const bookings = await bookingModel.find({
        booking_date: {
            $gte: date,
            $lt: nextDate
        }
    })
    .populate("voucher")
    .sort({ createdAt: -1 });
    const bookingCount = bookings.length;

    res.json({
        bookingCount,
        bookings});
};
const getAllBookingsByMonth = async (req, res) => {
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month) - 1; // JavaScript counts months from 0

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 1);

    const bookings = await bookingModel.find({
        booking_date: {
            $gte: startDate,
            $lt: endDate
        }
    })
    .populate("voucher")
    .sort({ createdAt: -1 })

    const bookingCount = bookings.length;

    res.json({
        bookingCount,
        bookings
    });
}; 
export default { updateBookingStatus, getAllCustomers, getAllPhotographers, getBookings, getBookingsByPhotographer, searchBookingsByStatus, getAllBookingsByDate, getAllBookingsByMonth };
