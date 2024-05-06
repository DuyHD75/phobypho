import privateClient from "../client/private.client";

const photographerEndpoints = {
   updateStatus: `photographers/updateStatus`,
   getBookingByPhotoId: (photoId) => `photographers/${photoId}/booking`,
};

const photographerApi = {
   updateStatus: async ({ status }) => {
      try {
         const response = await privateClient.post(photographerEndpoints.updateStatus, { status });
         return { response };
      } catch (err) {
         return { err };
      }
   },
   getBookingByPhotoId: async (photoId) => {
      try {
         const response = await privateClient.get(photographerEndpoints.getBookingByPhotoId(photoId));
         return { response };
      } catch (err) {
         return { err };
      }
   }, 
   getBookingOfPhotographer: async (photographerId) => {
      try {
         const response = await privateClient.get(`photographers/${photographerId}/bookingList`);
         return { response };
      } catch (err) {
         return { err };
      }
   },
};

export default photographerApi;