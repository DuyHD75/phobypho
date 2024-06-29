const RANK_CONFIG = [
  { name: "Kim cương", minBookingCount: 200, rate: 0.07},
  { name: "Vàng", minBookingCount: 100 , rate: 0.05},
  { name: "Bạc", minBookingCount: 50 , rate: 0.03},
  { name: "Đồng", minBookingCount: 20 , rate: 0.01}
];

const getRankByBookingCount = (bookingCount) => {
  for (let i = 0; i < RANK_CONFIG.length; i++) {
    const rank = RANK_CONFIG[i];
    if (bookingCount >= rank.minBookingCount) {
      return rank.name;
    }
  }
  return '';
};


const getRateByRanking = (rank) => {
  for (let i = 0; i < RANK_CONFIG.length; i++) {
    const rankConfig = RANK_CONFIG[i];
    if (rankConfig.name === rank) {
      return rankConfig.rate;
    }
  }
  return 0;
}

export { getRankByBookingCount, getRateByRanking };