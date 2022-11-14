import axios, { AxiosInstance, AxiosResponse } from "axios";

const API_KEY = "04c96827c11e080830f0c0b8d3a94fd6";
const BASE_PATH = "https://api.themoviedb.org/3";

const instance: AxiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  //   timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const Logger = {
  debug: (message?: any, ...optionalParams: any[]) => {
    if (
      // Constants.mode === 'DEBUG'
      true
    ) {
      console.debug(message, ":", JSON.stringify(optionalParams, null, 2));
    }
  },
};

//request
instance.interceptors.request.use((res) => {
  Logger.debug("interceptors request", res.url);
  return res.data;
});

//response
instance.interceptors.response.use((res) => {
  Logger.debug("interceptors request", res.config.url);
  return res;
});

export default instance;
