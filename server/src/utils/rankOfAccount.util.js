const RANK_CONFIG = {
  đồng: { name: "Đồng", minBookingCount: 20 },
  bạc: { name: "Bạc", minBookingCount: 50 },
  vàng: { name: "Vàng", minBookingCount: 100 },
  kim_cương: { name: "Kim cương", minBookingCount: 200 }
};

function getRankByBookingCount(bookingCount) {
  if (bookingCount >= RANK_CONFIG.kim_cương.minBookingCount) {
    return RANK_CONFIG.kim_cương.name;
  } else if (bookingCount >= RANK_CONFIG.vàng.minBookingCount) {
    return RANK_CONFIG.vàng.name;
  } else if (bookingCount >= RANK_CONFIG.bạc.minBookingCount) {
    return RANK_CONFIG.bạc.name;
  } else if (bookingCount >= RANK_CONFIG.đồng.minBookingCount) {
    return RANK_CONFIG.đồng.name;
  } else {
    return '';
  }
}

export { getRankByBookingCount };