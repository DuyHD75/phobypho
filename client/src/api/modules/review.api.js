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
          photo_id, content,
          photo_poster, rating
     }) => {
          try {
               
               const response = await privateClient.post(reviewEndpoints.add, {
                    photo_id, content,
                    photo_poster, rating
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