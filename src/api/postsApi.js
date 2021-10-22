import axiosClient from "./axiosClient";
const postsApi = {
  getPosts: (params) => {
    const url = "/posts";
    return axiosClient.get(url, params);
  },
  getApi: (params) => {
    const url = "/api";
    return axiosClient.get(url, params);
  },
  createNewPost: (params) => {
    const url = "/posts/create";
    return axiosClient.post(url, params);
  },
};

export default postsApi;
