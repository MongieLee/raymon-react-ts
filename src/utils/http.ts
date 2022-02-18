import qs from "qs";
import {logout} from "./auth-provider";
import {useAuth} from "../context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  data?: object,
  token?: string
  method?: string
}

const http = async (endpoint: string, {data, method, token, headers, ...customConfig}: Config = {}) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig
  };

  if (config.method?.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  return window.fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await logout();
        window.location.reload();
        return Promise.reject({message: "请重新登录"});
      }
      const data = await response.json();
      return response.ok ? data : Promise.reject(data);
    });
};

const useHttp = () => {
  const {user} = useAuth();
  return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, {...config, token: user?.token});
};

export {http, useHttp};