import privateClient from "../client/private.client";

const favoriteEndpoints = {
   list: "accounts/favorites",
   add: "accounts/favorites",
   remove: ({ favoriteId }) => `accounts/favorites/${favoriteId}`
};


const favoriteApi = {
   getList: async () => {
      try {
         const response = await privateClient.get(favoriteEndpoints.list);
         return { response };
      } catch (err) { return { err }; }
   },
   add: async ({
      photoId
   }) => {
      try {
         const response = await privateClient.post(
            favoriteEndpoints.add,
            {
               photoId
            }
         );

         return { response };
      } catch (err) { return { err }; }
   },
   remove: async ({ favoriteId }) => {
      try {
         const response = await privateClient.delete(favoriteEndpoints.remove({ favoriteId }));

         return { response };
      } catch (err) { return { err }; }
   }
};

export default favoriteApi;