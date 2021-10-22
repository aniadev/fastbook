import axios from "axios";
var FormData = require("form-data");

const imageUploadApi = {
  getImageLink: (params) => {
    // const url = "/upload?key=800608715f14792f47129386e4f1a512";
    // console.log(params);
    var data = new FormData();
    data.append("image", params);
    var config = {
      method: "post",
      url: "https://api.imgbb.com/1/upload?key=800608715f14792f47129386e4f1a512",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };

    return axios(config);
  },
};

export default imageUploadApi;
