import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const serviceEndpoints = {
  list: "/services",
};

const servicesApi = {
  getList: async () => {
    try {
      const response = await publicClient.get(serviceEndpoints.list);
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default servicesApi;
