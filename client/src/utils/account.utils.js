const getQuarterDates = (currentDate) => {
   const currentMonth = currentDate.getMonth();
   const currentYear = currentDate.getFullYear();

   const quarterStartMonth = Math.floor(currentMonth / 3) * 3;
   const quarterEndMonth = quarterStartMonth + 2;

   const startDate = new Date(currentYear, quarterStartMonth, 1);
   const endDate = new Date(currentYear, quarterEndMonth + 1, 0);

   return { startDate, endDate };
};

const formatDate = (date) => {
   return date.toLocaleDateString('vi-VN', { year: "numeric", month: "short", day: "numeric" });
};

export { getQuarterDates, formatDate}