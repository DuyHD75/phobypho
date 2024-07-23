import responseHandler from "../handlers/response.handler.js";
import bookingModel from "../models/booking.model.js";
import customerModel from "../models/customer.model.js";
import photographerModel from "../models/photographer.model.js";
import accountModel from "../models/account.model.js";
import { ROLES_LIST } from "../configs/enum.config.js";
import dashboard from "../utils/dashBoard.model.js";
import dashBoardHandler from "../utils/dashBoard.handler.js";


const getAllCustomers = async (req, res) => {
  try {
    const customers = await customerModel.find().populate('account').populate('vouchers').lean();

    // Flatten the account field into the customer object
    const flattenedCustomers = customers.map(customer => {
      return {
        ...customer.account, // Spread account fields
        ...customer, // Spread customer fields (account will be overwritten)
        account: undefined, // Optionally remove the nested account object if you don't want it in the final response
      };
    });

    responseHandler.ok(res, flattenedCustomers);
  } catch (error) {
    console.error("Error in admin.controller.getAllCustomers", error);
    responseHandler.error(res);
  }
};

const getAllPhotographers = async (req, res) => {
  try {
    const photographers = await photographerModel.find().populate('account').lean();

    const flattenedPhotographers = photographers.map(photographer => ({
      ...photographer.account,
      ...photographer,
      account: photographer.account._id,
    }));

    responseHandler.ok(res, flattenedPhotographers);
  } catch (error) {
    console.error("Error in admin.controller.getAllPhotographers", error);
    responseHandler.error(res);
  }
};

const updatePhotographerStatus = async (req, res) => {
  try {
    const { photographerIds, status } = req.body;

    console.log("Received photographerIds:", photographerIds, status);

    if (!Array.isArray(photographerIds) || photographerIds.length === 0) {
      return responseHandler.error(res, "Invalid photographerIds in request body", 400);
    }

    const updatePromises = photographerIds.map(async (account) => {
      const result = await photographerModel.findOneAndUpdate({ account }, { status }, { new: true });
      return result;
    });

    const updateResults = await Promise.all(updatePromises);

    if (updateResults.includes(null)) {
      return responseHandler.error(res, "One or more photographer updates failed", 500);
    }

    responseHandler.ok(res, { message: "photographer status updated successfully" });

  } catch (error) {
    responseHandler.error(res, "An error occurred while updating photographer status");
  }
};

const getBookings = async (req, res) => {
  try {
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
    const transformedBookings = await transformBookingData(bookings);
    responseHandler.ok(res, { bookings: transformedBookings, bookingCount });
  } catch (error) {
    responseHandler.error(res);
  };
}

const transformBookingData = async (bookings) => {
  const transformedBookings = await Promise.all(bookings.map(async (booking) => {
    const customer = await accountModel.findById(booking.customer);
    const updatedCustomer = { ...customer.toObject() };
    delete updatedCustomer.username;
    return { ...booking.toObject(), customer: updatedCustomer };
  }));
  return transformedBookings;
};

const getBookingsByPhotographer = async (req, res) => {
  try {
    const { photographerId } = req.params;
    const bookings = await bookingModel.find({ photographer: photographerId });
    const totalPrice = bookings.reduce((acc, booking) => acc + booking.total_price, 0);
    const transformedBookings = await transformBookingData(bookings);
    responseHandler.ok(res, { bookings: transformedBookings, totalPrice });
    // responseHandler.ok(res, bookings);
  } catch (error) {
    console.error("Error in admin.controller.getBookingsByPhotographer");
    responseHandler.error(res);
  }
};

const searchBookingsByStatus = async (req, res) => {
  try {
    const { status } = req.query;
    const bookings = await bookingModel.find({ status });
    const transformedBookings = await transformBookingData(bookings);
    responseHandler.ok(res, transformedBookings);
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
    const transformedBookings = await transformBookingData(bookings);
    responseHandler.ok(res, { bookingCount, bookings: transformedBookings });


  } catch (error) {
    console.error("Error in admin.controller.getAllBookingsByDate");
    responseHandler.error(res);
  }
};

const getAllBookingsByMonth = async (req, res) => {
  try {
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month) - 1; 
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
    const transformedBookings = await transformBookingData(bookings);
    responseHandler.ok(res, { bookingCount, bookings: transformedBookings });
  } catch (error) {
    console.error("Error in admin.controller.getAllBookingsByMonth");
    responseHandler.error(res);
  }
};

const getExtractDashboardInfo = async (req, res) => {
  try {


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

    console.log("Received bookingIds:", bookingIds);

    if (!Array.isArray(bookingIds) || bookingIds.length === 0) {
      return responseHandler.error(res, "Invalid bookingIds in request body", 400);
    }



    const updatePromises = bookingIds.map(async (bookingId) => {
      console.log(`Updating booking with ID: ${bookingId}`);
      const result = await bookingModel.findByIdAndUpdate(bookingId, { status }, { new: true });
      console.log(`Update result for booking ID ${bookingId}:`, result);
      return result;
    });

    const updateResults = await Promise.all(updatePromises);

    if (updateResults.includes(null)) {
      return responseHandler.error(res, "One or more booking updates failed", 500);
    }

    responseHandler.ok(res, { message: "Booking status updated successfully" });

  } catch (error) {
    console.error("Error in admin.controller.completeBooking:", error);
    responseHandler.error(res, "An error occurred while updating booking status");
  }
}


export default {
  getAllCustomers,
  getAllPhotographers,
  getBookings,
  getBookingsByPhotographer,
  searchBookingsByStatus,
  getAllBookingsByDate,
  getAllBookingsByMonth,
  getExtractDashboardInfo,
  completeBooking,
  updatePhotographerStatus
};
