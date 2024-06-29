import bookingModel from "../models/booking.model.js";
import {ORDER_STATUS} from "../configs/enum.config.js";
const revenue_profit_daily = async () => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const bookings = await bookingModel.find({
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    }).populate("voucher").populate("servicePackageId");
    
    const totalRevenue = bookings.reduce(
      (total, booking) => total + booking.total_price,
      0
    );
    const totalProfit = bookings.reduce((total, booking) => {
      const servicePrice = booking.servicePackageId.price;
      const photographerRate = booking.photographer_rate;
      const voucherValue = booking.voucher ? booking.voucher.value : 0;
      let profit = servicePrice * photographerRate - (servicePrice * voucherValue/100);
      // if (profit < 0) {
      //   profit = 0;
      // }
      return total + profit;
    }, 0);

    return { totalRevenue, totalProfit };
};

const growth = async () => {
  const todayRevenue = await revenue_profit_daily();

  const startOfYesterday = new Date();
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);
  startOfYesterday.setHours(0, 0, 0, 0);
  const endOfYesterday = new Date();
  endOfYesterday.setDate(endOfYesterday.getDate() - 1);
  endOfYesterday.setHours(23, 59, 59, 999);

  const yesterdayBookings = await bookingModel.find({
    createdAt: {
      $gte: startOfYesterday,
      $lt: endOfYesterday,
    },
  }).populate("voucher").populate("servicePackageId");

  const yesterdayRevenue = yesterdayBookings.reduce(
    (total, booking) => total + booking.total_price,
    0
  );
  let growth;
  if (yesterdayRevenue === 0) {
    growth = 'N/A'; // Không xác định hoặc giá trị mặc định
  } else {
    growth = ((todayRevenue.totalRevenue - yesterdayRevenue) / yesterdayRevenue) * 100;
  }
  return {
    growth: growth !== 'N/A' ? `${growth.toFixed(2)}%` : growth,
  };
};

const totalRevenue = async () => {
  const bookings = await bookingModel.find({
    status: { $ne: ORDER_STATUS.cancelled },
  });

  const totalRevenue = bookings.reduce((total, booking) => {
    return total + booking.total_price;
  }, 0);

  return {totalRevenue};
};

const handledOrdersAndTotalBooking = async () => {
  const totalBookings = await bookingModel.countDocuments();

  const totalHandledOrders = await bookingModel.countDocuments({
    status: { $ne: ORDER_STATUS.pending },
  });

  return { totalBookings, totalHandledOrders };
};
const getMonthData = async () => {
  const months = [];
  const revenues = [];
  const profits = [];
  const currentDate = new Date();

  for (let i = 5; i >= 0; i--) {
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 0, 23, 59, 59, 999);

    const bookings = await bookingModel.find({
      createdAt: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
    }).populate("voucher").populate("servicePackageId");

    const totalRevenue = bookings.reduce((total, booking) => total + booking.total_price, 0);
    const totalProfit = bookings.reduce((total, booking) => {
      const servicePrice = booking.servicePackageId.price;
      const photographerRate = booking.photographer_rate;
      const voucherValue = booking.voucher ? booking.voucher.value : 0;
      const profit = servicePrice * photographerRate - (servicePrice * (voucherValue / 100));
      return total + profit;
    }, 0);

    // Định dạng tháng và năm
    const month = startOfMonth.toLocaleString('default', { month: 'short' });
    const year = startOfMonth.getFullYear();
    months.push(`${month} ${year}`);
    revenues.push(totalRevenue);
    profits.push(totalProfit);
  }
  
  return { months, revenues, profits };
};
const getWeekData = async () => {
  const weeks = [];
  const revenues = [];
  const profits = [];
  const currentDate = new Date();

  for (let i = 8; i >= 0; i--) {
    const startOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - i * 7);
    const endOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - i * 7 + 6, 23, 59, 59, 999);

    const bookings = await bookingModel.find({
      createdAt: {
        $gte: startOfWeek,
        $lt: endOfWeek,
      },
    }).populate("voucher").populate("servicePackageId");

    const totalRevenue = bookings.reduce((total, booking) => total + booking.total_price, 0);
    const totalProfit = bookings.reduce((total, booking) => {
      const servicePrice = booking.servicePackageId.price;
      const photographerRate = booking.photographer_rate;
      const voucherValue = booking.voucher ? booking.voucher.value : 0;
      const profit = servicePrice * photographerRate - (servicePrice * (voucherValue / 100));
      return total + profit;
    }, 0);

    // Lấy số thứ tự của tuần trong năm
    const weekOfYear = getWeekNumber(startOfWeek);
    weeks.push(`${weekOfYear}`);
    revenues.push(totalRevenue);
    profits.push(totalProfit);
  }

  return { weeks, revenues, profits };
};

// Hàm lấy số thứ tự tuần trong năm
const getWeekNumber = (date) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

export default {  revenue_profit_daily, growth, totalRevenue, handledOrdersAndTotalBooking, getMonthData, getWeekData };
