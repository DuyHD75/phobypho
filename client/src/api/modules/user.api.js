import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const userEndpoints = {
     login: "accounts/login",
     signup: "accounts/signup",
     getInfo: "accounts/info",
     passwordUpdate: "accounts/update-password",
     updateInfo: "accounts/update-info",
     googleLogin: "accounts/getUser",
     forgotPassword: "accounts/forgot-password",
     resetPassword: "accounts/reset-password"
};

const userApi = {
     login: async ({ username, password }) => {
          try {
               const response = await publicClient.post(userEndpoints.login, { username, password })

               return { response };
          } catch (err) { return { err } }
     },
     signup: async ({ username, displayName, phoneNumber, email, password, confirmPassword, role, location }) => {
          try {
               if (role === "PHOTOGRAPHER") {
                    const response = await publicClient.post(userEndpoints.signup,
                         { username, displayName, phoneNumber, email, password, confirmPassword, role, location })

                         console.log(response)
                    return { response };
               } else {
                    const response = await publicClient.post(userEndpoints.signup,
                         { username, displayName, phoneNumber, email, password, confirmPassword, role })
                    return { response };
               }

          } catch (err) { return { err } }
     },
     passwordUpdate: async ({ password, newPassword, confirmNewPassword }) => {
          try {
               const response = await privateClient.put(userEndpoints.passwordUpdate, { password, newPassword, confirmNewPassword });
               return { response };
          } catch (err) { return { err } }
     },
     getInfo: async () => {
          try {
               const response = await privateClient.get(userEndpoints.getInfo);
               return { response };
          } catch (err) { return { err } }
     },
     updateInfo: async (userData) => {
          try {
               console.log(userData);
               const response = await privateClient.put(userEndpoints.updateInfo, userData);
               return { response };
          } catch (err) { return { err } }
     },
     googleLogin: async () => {
          try {
               const response = await publicClient.get(userEndpoints.googleLogin
                    // {withCredentials : true}
               );
               console.log(response);
               return { response };
          } catch (err) { return { err } }
     },
     forgotPassword: async ({ email }) => {
          try {
               const response = await publicClient.post(userEndpoints.forgotPassword, { email });
               return { response };
          } catch (err) { return { err } }
     },
     resetPassword: async ({ password, confirmPassword, token }) => {
          try {
               const response = await publicClient.post(userEndpoints.resetPassword, { password, confirmPassword, token });
               return { response };
          } catch (err) { return { err } }
     }
}


export default userApi;