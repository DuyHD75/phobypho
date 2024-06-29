class Dashboard {
  constructor(
    daily_revenue,
    profit,
    growth,
    total_revenue,
    handled_orders,
    total_number_of_bookings,
    month,
    week,
    revenue_month,
    revenue_week,
    profit_month,
    profit_week
  ) {
    this.daily_revenue = daily_revenue;
    this.profit = profit;
    this.growth = growth;
    this.total_revenue = total_revenue;
    this.handled_orders = handled_orders;
    this.total_number_of_bookings = total_number_of_bookings;
    this.monthly_chart = {
      revenue: {
        month: month,
        data: revenue_month
      },
      profit: {
        month: month,
        data: profit_month
      }
    };
    this.weekly_chart = {
      revenue: {
        week: week,
        data: revenue_week
      },
      profit: {
        week: week,
        data: profit_week
      }
    };
  }
}

export default Dashboard;