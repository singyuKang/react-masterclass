import axios, { AxiosInstance, AxiosResponse } from "axios";

const API_KEY = "04c96827c11e080830f0c0b8d3a94fd6";
const BASE_PATH = "https://api.themoviedb.org/3";

const instance: AxiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  // timeout: 60000,
  params: {
    api_key: process.env.REACT_APP_API_KEY,
    language: "en-US",
  },
  // headers: {
  //   // "Content-Type": "application/json",
  //   "Access-Control-Allow-Origin": "*",
  // },
  // withCredentials: true,
});

// axios.defaults.headers["Access-Control-Allow-Origin"] = "*";

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
instance.interceptors.request.use(
  async function (config: any) {
    Logger.debug("interceptors request", config.url);
    const token = localStorage.getItem("login-token");

    if (token) {
      config.headers["Authorization-jwt"] = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    Logger.debug("interceptors request error", error);
    Logger.debug("???????interceptors request ????", error.code);
    return Promise.reject(error);
  }
);

//response
instance.interceptors.response.use(
  function (response) {
    Logger.debug("interceptors response.status", response.status);
    Logger.debug("interceptors response.data", response.data);

    if (response.headers["access-token"]) {
      localStorage.setItem("access-token", response.headers["access-token"]);
    }
    if (response.headers["refresh-token"]) {
      localStorage.setItem("refresh-token", response.headers["refresh-token"]);
    }

    return response;
  },
  async function (error) {
    Logger.debug(
      "####### interceptors response status:",
      error.response.status
    );
    Logger.debug("####### interceptors response error:", error.response.data);
    // const originalConfig = error.config;

    // console.log('####### interceptors error', error.response)
    // console.log('####### interceptors config', error.config)
    // console.log('####### interceptors response.status', error.response.status)
    // console.log('####### interceptors response.data', error.response.data)
    // console.log('originalConfig._retry', originalConfig._retry)

    if (error.response) {
      //     if (error.response.status === 401 && !originalConfig._retry) {

      //         console.log('originalConfig._retry', originalConfig._retry)
      //         originalConfig._retry = true;
      //         console.log('originalConfig._retry change', originalConfig._retry)

      //         try {
      //             const accessToken = await CommonService.refreshToken()
      //             instance.defaults.headers.common["Authorization-jwt"] = accessToken

      //             return instance(originalConfig)
      //         } catch (_errer) {
      //             if (_errer.response && _errer.response.data) {
      //                 return Promise.reject(_errer.response.data)
      //             }
      //             return Promise.reject(_errer)
      //         }

      //     }

      //     if (error.response.status === 403 && error.response.data) {
      //         return Promise.reject(error.response.data)
      //     }

      // if (error.response.status === 500) {
      //   return Promise.reject({
      //     message: `사용자 검증에 실패하였습니다.`,
      //   });
      // }

      if (error.response.status === 503) {
        return Promise.reject({
          message: `현재 접속이 원활하게 이루어지지 않고있습니다. 이용에 불편을 드려 죄송합니다.`,
        });
      }

      if (error.response.data.status === "Failed") {
        return Promise.reject(error.response.data.error);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
