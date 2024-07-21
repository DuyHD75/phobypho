import { createSlice } from '@reduxjs/toolkit';


export const bookingSlice = createSlice({
   name: "Booking",
   initialState: {
      bookingData: {}
   },
   reducers: {
      setBookingData: (state, action) => {
         state.bookingData = action.payload;
      }
   }
});


export const {
   setBookingData
} = bookingSlice.actions;

export default bookingSlice.reducer;