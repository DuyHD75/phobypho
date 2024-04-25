import { createSlice } from "@reduxjs/toolkit";

export const authModalSlice = createSlice({
  name: "AuthModal",
  initialState: {
    authModalOpen: false,
    receiveVoucherModalOpen: false,
  },
  reducers: {
    setAuthModalOpen: (state, action) => {
      state.authModalOpen = action.payload;
    },
    setReceiveVoucherModalOpen: (state, action) => {
      state.receiveVoucherModalOpen = action.payload;
      state.customerPoints = action.payload.customerPoints;
      state.voucher = action.payload.voucher;
    },
  },
});

export const { setAuthModalOpen, setReceiveVoucherModalOpen } =
  authModalSlice.actions;

export default authModalSlice.reducer;
