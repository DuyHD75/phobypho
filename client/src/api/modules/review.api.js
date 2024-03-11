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
          mediaType, mediaId, content,
          mediaPoster, mediaTitle
     }) => {
          try {
               const response = await privateClient.post(reviewEndpoints.add, {
                    mediaType, mediaId, content,
                    mediaPoster, mediaTitle
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