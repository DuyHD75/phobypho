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
      state.userPoint = action.payload.userPoint;
      state.point = action.payload.point;
      state.code = action.payload.code;
    },
  },
});

export const { setAuthModalOpen, setReceiveVoucherModalOpen } =
  authModalSlice.actions;

export default authModalSlice.reducer;
