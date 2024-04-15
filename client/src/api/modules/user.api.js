import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const userEndpoints = {
     login: "accounts/login",
     signup: "accounts/signup",
     getInfo: "accounts/info",
     passwordUpdate: "accounts/update-password",
};

const userApi = {
     login: async ({ username, password }) => {
          try {
               const response = await publicClient.post(userEndpoints.login, { username, password })
     
               return { response };
          } catch (err) { return { err } }
     },
     signup: async ({ username, displayName, phoneNumber, email, password, confirmPassword, role }) => {
          try {
               const response = await publicClient.post(userEndpoints.signup,
                    { username, displayName, phoneNumber, email, password, confirmPassword, role })

               return { response };
          } catch (err) { return { err } }
     },

}


export default userApi;