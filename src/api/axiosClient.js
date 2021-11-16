import axios from "axios";
import queryString from "query-string";
import Cookies from "js-cookie";

// const BASE_URL = "http://localhost:8599";
const BASE_URL = "http://phakebook.tk:8599";
// const accessToken =
//   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTZkMjYyZGE3YmYwMjI4N2Y2NzdhMGIiLCJuYW1lIjoiUGhhbSBDb25nIEhhaSIsInVzZXJuYW1lIjoicGhhbWNvbmdoYWkiLCJhdmF0YXIiOiJodHRwczovL21lZGlhLmlzdG9ja3Bob3RvLmNvbS9waG90b3MvYnVzaW5lc3NtYW4tc2lsaG91ZXR0ZS1hcy1hdmF0YXItb3ItZGVmYXVsdC1wcm9maWxlLXBpY3R1cmUtcGljdHVyZS1pZDQ3NjA4NTE5OD9rPTIwJm09NDc2MDg1MTk4JnM9NjEyeDYxMiZ3PTAmaD04SjNWZ09aYWJfT2lZb0l1WmZpTUl2dWNGWUI4dldZbEtuU2pLdUtlWVFNPSJ9.TOFFVaEN-K0HfM2Wg9uMLv5yBHgRyRmUyxF8oerxQng";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  config.headers.Authorization = "Bearer " + Cookies.get("accessToken");
  // console.log(Cookies.get("accessToken"));
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // // Handle errors
    // console.log(error);
    return {
      status: (error.message === "Network Error" && 408) || "unknown",
      message: error.message,
    };
  }
);

export default axiosClient;
