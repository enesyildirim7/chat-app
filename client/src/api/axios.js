import axios from "axios";
import { config } from "../configs/configs";

var URL;

if (config.DEV) {
  URL = config.LOCAL_SERVER_URL;
} else {
  URL = config.PROD_SERVER_URL;
}

const Axios = axios.create({
  baseURL: URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
  withCredentials: true,
});

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log(error.response.status);
    console.log(error.response.data);
    console.log(error.response.statusText);
    console.log(originalRequest);

    if (typeof error.response === "undefined") {
      alert("Cors Error!");
      return Promise.reject(error);
    }
  }
);

export default Axios;
