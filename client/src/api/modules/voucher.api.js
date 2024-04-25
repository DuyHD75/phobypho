import privateClient from "../client/private.client";

const voucherEndpoints = {
   getVouchers: "vouchers",
   exchangeVoucher: "vouchers/exchange"
};

const voucherApi = {
   getVouchers: async () => {
      try {
         const response = await privateClient.get(`${voucherEndpoints.getVouchers}`);
         return { response };
      } catch (err) {
         return { err };
      }
   },
   exchangeVoucher: async (voucherId, pointsRequired) => {
      try {
         const response = await privateClient.post(
            voucherEndpoints.exchangeVoucher,
            { voucherId, pointsRequired });
            console.log(response)
         return { response };
      } catch (err) {
         return { err };
      }
   }
};

export default voucherApi;