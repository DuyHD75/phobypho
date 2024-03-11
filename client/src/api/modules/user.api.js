import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const userEndpoints = {
     signin: "users/signin",
     signup: "users/signup",
     getInfo: "users/info",
     passwordUpdate: "users/update-password",
};

const userApi = {
     login: async ({ username, password }) => {
          try {

          } catch (err) { return { err } }
     },
     signup: async ({ username, phoneNumber, email, password, confirmPassword }) => {
          try {

          } catch (err) { return { err } }
     },

}


export default userApi;