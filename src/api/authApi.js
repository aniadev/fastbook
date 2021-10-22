import axiosClient from "./axiosClient";

const authApi = {
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
