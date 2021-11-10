import axiosClient from "./axiosClient";

const profileApi = {
  getProfileData: (params) => {
    const url = "/user";
    return axiosClient.get(url, { params });
  },
  getPosts: (params) => {
    const url = "user/posts";
    return axiosClient.get(url, { params });
  },
};

export default profileApi;
