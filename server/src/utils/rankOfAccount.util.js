const RANK_CONFIG = [
  { name: "Kim cương", minBookingCount: 200 },
  { name: "Vàng", minBookingCount: 100 },
  { name: "Bạc", minBookingCount: 50 },
  { name: "Đồng", minBookingCount: 20 }
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

export { getRankByBookingCount };