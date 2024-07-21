import { create } from "@mui/material/styles/createTransitions";
import privateClient from "../client/private.client";

const customerEndpoints = {
   createBooking: "customers/bookings",
   getBookings: (customerId) => `customers/${customerId}/bookings`,
   getCustomerByAccountId: `customers`,
   addVoucher: (customerId) => `customers/${customerId}/vouchers`,
   removeVoucher: (customerId, voucherId) => `customers/${customerId}/vouchers/${voucherId}`,
   updatePoints: (customerId) => `customers/${customerId}/points`,
   customerVouchers: `customers/vouchers`,
   getBookingByPhotoId: (photoId) => `customers/${photoId}/booking`,
   cancelBooking: (bookingId) => `customers/bookings/${bookingId}/status`,
   confirmCompleted: (bookingId) => `bookings/${bookingId}/confirm-completed`,
   createPaymentLink: "customers/create-payment-link",
   receiveHookPayment: "customers/receive-hook"
};



const customerApi = {
   createBooking: async (bookingData) => {
      try {
         const response = await privateClient.post(customerEndpoints.createBooking, bookingData);
         return { response };
      } catch (err) {
         return { err };
      }
   },
   getBookings: async (customerId) => {
      try {
         const response = await privateClient.get(customerEndpoints.getBookings(customerId));
         return { response };
      } catch (err) {
         return { err };
      }
   },
   getCustomerByAccountId: async () => {
      try {
         const response = await privateClient.get(customerEndpoints.getCustomerByAccountId);
         return { response };
      } catch (err) {
         return { err };
      }
   },
   addVoucher: async (customerId, voucherData) => {
      try {
         const response = await privateClient.post(customerEndpoints.addVoucher(customerId), voucherData);
         return { response };
      } catch (err) {
         return { err };
      }
   },
   removeVoucher: async (customerId, voucherId) => {
      try {
         const response = await privateClient.delete(customerEndpoints.removeVoucher(customerId, voucherId));
         return { response };
      } catch (err) {
         return { err };
      } 
   },
   updatePoints: async (customerId, pointsData) => {
      try {
         const response = await privateClient.put(customerEndpoints.updatePoints(customerId), pointsData);
         return { response };
      } catch (err) {
         return { err };
      }
   },
   getCustomerVouchers: async () => {
      try {
         const response = await privateClient.get(customerEndpoints.customerVouchers);
         return { response };
      } catch (err) {
         return { err };
      }
   },
   getBookingByPhotoId: async (photoId) => {
      try {
         const response = await privateClient.get(customerEndpoints.getBookingByPhotoId(photoId));
         return { response };
      } catch (err) {
         return { err };
      }
   },
   createPaymentLink: async (bookingData) => {
      try {
         const response = await privateClient.post(customerEndpoints.createPaymentLink, bookingData);
         return { response };
      } catch (err) {
         return { err };
      }
   },
   receiveHookPayment: async () => {
      try {
         const response = await privateClient.post(customerEndpoints.receiveHookPayment);
         return { response };
      } catch (err) {
         return { err };
      }
   }, cancelBooking: async (bookingId, status, cancelFee) => {
      try {
         const response = await privateClient.put(customerEndpoints.cancelBooking(bookingId), { status, cancelFee });
         return { response };
      } catch (err) {
         return { err };
      }
   },
   confirmCompleted: async (bookingId) => {
      try {
         const response = await privateClient.put(customerEndpoints.confirmCompleted(bookingId));
         return { response };
      } catch (err) {
         return { err };
      }
   }
};

export default customerApi;