import axiosClient from "./axiosClient";

const authApi = {
  auth: () => {
    const url = "/auth";
    return axiosClient.post(url); // check auth, send Authorization request
  },
  login: (params) => {
    const url = "/auth/login";
    return axiosClient.post(url, params);
  },
  register: (params) => {
    const url = "/auth/register";
    return axiosClient.post(url, params);
  },
  // register {
  //   name: regData.name,
  //   username: regData.username,
  //   password: regData.password,
  //   email: regData.email,
  // }
};

export default authApi;
