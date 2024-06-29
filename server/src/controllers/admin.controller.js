import responseHandler from "../handlers/response.handler.js";
import bookingModel from "../models/booking.model.js";
import customerModel from "../models/customer.model.js";
import photographerModel from "../models/photographer.model.js";
import accountModel from "../models/account.model.js";
import { ROLES_LIST } from "../configs/enum.config.js";
import dashboard from "../utils/dashBoard.model.js";
import dashBoardHandler from "../utils/dashBoard.handler.js";
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
  const skip = parseInt(req.query.skip);
  let bookings;
  if (limit) {
    bookings = await bookingModel
      .find()
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);
  } else {
    bookings = await bookingModel.find();
  }
  const bookingCount = bookings.length;
  res.json({
    bookings,
    bookingCount,
  });
};
const getBookingsByPhotographer = async (req, res) => {
  try {
    const { photographerId } = req.params;
    const bookings = await bookingModel.find({ photographer: photographerId });
    responseHandler.ok(res, bookings);
  } catch (error) {
    console.error("Error in admin.controller.getBookingsByPhotographer");
    responseHandler.error(res);
  }
};

const searchBookingsByStatus = async (req, res) => {
  try {
    const { status } = req.query;
    const bookings = await bookingModel.find({ status });
    responseHandler.ok(res, bookings);
  } catch (error) {
    console.error("Error in admin.controller.searchBookingsByStatus");
    responseHandler.error(res);
  }
};


const getAllBookingsByDate = async (req, res) => {
  try {
    const date = new Date(req.params.date);
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);
    const bookings = await bookingModel
      .find({
        createdAt: {
          $gte: date,
          $lt: nextDate,
        },
      })
      .populate("voucher")
      .sort({ createdAt: -1 });

    const bookingCount = bookings.length;
    responseHandler.ok(res, {bookingCount, bookings});
   
  } catch (error) {
    console.error("Error in admin.controller.getAllBookingsByDate");
    responseHandler.error(res);
  }
};

const getAllBookingsByMonth = async (req, res) => {
  try {
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month) - 1; // JavaScript counts months from 0
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 1);
    const bookings = await bookingModel
      .find({
        createdAt: {
          $gte: startDate,
          $lt: endDate,
        },
      })
      .populate("voucher")
      .sort({ createdAt: -1 });
    const bookingCount = bookings.length;
    responseHandler.ok(res, {bookingCount, bookings});
  } catch (error) {
    console.error("Error in admin.controller.getAllBookingsByMonth");
    responseHandler.error(res);
  }
};

const getExtractDashboardInfo = async (req, res) => {
  try{
  

  const revenue_profit_daily = await dashBoardHandler.revenue_profit_daily();
  const daily_revenue = revenue_profit_daily.totalRevenue;
  const profit = revenue_profit_daily.totalProfit;

  const growth = (await dashBoardHandler.growth()).growth;
  const total_revenue = (await dashBoardHandler.totalRevenue()).totalRevenue;

  const handledOrdersAndTotalBooking = await dashBoardHandler.handledOrdersAndTotalBooking();
  const handled_orders = handledOrdersAndTotalBooking.totalHandledOrders;
  const total_number_of_bookings = handledOrdersAndTotalBooking.totalBookings;

  const monthData = await dashBoardHandler.getMonthData();
  const month = monthData.months;
  const revenue_month = monthData.revenues;
  const profit_month = monthData.profits;  

  const weekData = await dashBoardHandler.getWeekData();
  const week = weekData.weeks;
  const revenue_week = weekData.revenues;
  const profit_week = weekData.profits;


  const dashboardInfo = new dashboard(daily_revenue, profit, growth, total_revenue, handled_orders, total_number_of_bookings, month, week, revenue_month, revenue_week, profit_month, profit_week);



  responseHandler.ok(res, dashboardInfo);
  } catch (error) {
    console.log(error);
    console.error("Error in admin.controller.getExtractDashboardInfo");
    responseHandler.error(res);
  }

};
const completeBooking = async (req, res) => {
  try {
    const { bookingIds, status } = req.body;

    if (!bookingIds || !status) {
      return responseHandler.error(res, "Missing bookingIds or status in request body", 400);
    }

    await Promise.all(bookingIds.map(async (bookingId) => {
      await bookingModel.findByIdAndUpdate(bookingId, { status });
    }));

    responseHandler.ok(res, { message: "Booking status updated successfully" });
  
  } catch (error) {
    console.error("Error in admin.controller.completeBooking:", error);
    responseHandler.error(res, "An error occurred while updating booking status");
  }
}

export default {
  updateBookingStatus,
  getAllCustomers,
  getAllPhotographers,
  getBookings,
  getBookingsByPhotographer,
  searchBookingsByStatus,
  getAllBookingsByDate,
  getAllBookingsByMonth,
  getExtractDashboardInfo,
  completeBooking
};
