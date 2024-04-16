import privateClient from "../client/private.client";



const customerEndpoint = {
   checkout: "customers/checkout",

};

const customerApi = {
   checkout: async (bookingData) => {
      try {
         const response = await privateClient.post(customerEndpoint.checkout, bookingData)
         return { response };
      } catch (err) { return { err } }
   },


}

export default customerApi;