import privateClient from "../client/private.client";

const photographerEndpoints = {
   updateStatus: `photographers/updateStatus`,
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
};

export default photographerApi;