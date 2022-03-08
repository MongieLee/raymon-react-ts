import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { apiUrl } from "./commonPath";
import qs from "qs";
import { getItem, setItem } from "./token";
import { message, Result } from "antd";
import { localStorageKey } from "services/auth-provider";
axios.defaults.timeout = 3000;
axios.defaults.baseURL = apiUrl;

enum ResultEnum {
  SUCCESSFUL = "SUCCESSFUL",
  FAILURE = "FAILURE",
}
interface AuthConfig extends AxiosRequestConfig {
  grant_type?: string;
}

const request = <T = any>(url: string, { ...config }: AuthConfig) => {
  let options: AxiosRequestConfig = {
    ...config,
    url,
  };
  const token = getItem(localStorageKey);
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return new Promise<Result<T>>((reslove, reject) => {
    axios(options)
      .then(
        ({ status, data }: { status: number; data: Result<T> }) => {
          if (status >= 200 && status < 300) {
            if (data.status === ResultEnum.SUCCESSFUL) {
              reslove(data);
            } else {
              // 第一种错误，服务逻辑处理完毕返回的业务异常
              reject(new Error(data.msg));
            }
          }
        },
        (error: Error) => {
          // 处理超时
          message.error(error.message);
          return Promise.reject(error);
        }
      )
      // 第二种错误，status code非2xx时，必须在这里catch并执行reject将Promise的状态改为失败
      // 否则调用request的消费者无法catch到异常
      .catch((error: Error) => {
        reject(error);
      });
  });
};

export { request };
