import privateClient from "../client/private.client";

const reviewEndpoints = {
     list: "reviews",
     add: "reviews",
     remove: ({ reviewId }) => `reviews/${reviewId}`
};

const reviewApi = {
     getList: async () => {
          try {
               const response = await privateClient.get(reviewEndpoints.list);
               return { response };
          } catch (err) { return { err }; }
     },
     add: async ({
          booking_id, photo_id, content,
          photo_poster, rating, point
     }) => {
          try {
               
               const response = await privateClient.post(reviewEndpoints.add, {
                    booking_id, photo_id, content,
                    photo_poster, rating, point
               });
               return { response };
          } catch (err) { return { err }; }
     },
     remove: async ({ reviewId }) => {
          try {
               const response = await privateClient.delete(reviewEndpoints.remove({ reviewId }));
               return { response };
          } catch (err) { return { err } };
     }
};


export default reviewApi;