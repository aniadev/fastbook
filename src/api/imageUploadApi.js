import axios from "axios";
import queryString from "query-string";

const imageClient = axios.create({
  baseURL: "https://api.imgbb.com/1",
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
imageClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});
imageClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);

const imageUploadApi = {
  getImageLink: (params) => {
    const url = "/upload?key=800608715f14792f47129386e4f1a512";
    console.log(params);
    return imageClient.post(url, params);
  },
};

export default imageUploadApi;
