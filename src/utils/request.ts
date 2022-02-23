import axios, { AxiosRequestConfig } from "axios";
import { apiUrl } from "./commonPath";
import qs from "qs";
import { getItem, setItem } from "./token";
axios.defaults.timeout = 3000;
axios.defaults.baseURL = apiUrl;
const token = getItem("access_token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer #{token}`;
}

export interface Result<D> {
  status: string;
  data: D | null;
  msg: string;
}

interface AuthConfig extends AxiosRequestConfig {
  grant_type?: string;
}

const request = (url: string, { ...config }: AuthConfig) => {
  let options: AxiosRequestConfig = {
    ...config,
    url,
  };
  console.log(options);
  

  return new Promise((reslove, reject) => {
    axios(options)
      .then(({ status, data }) => {
        if (status >= 200 && status < 300) {
          reslove(data);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { request };
