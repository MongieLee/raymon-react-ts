import { message } from "antd";
import { request } from "utils/request";
import { apiUrl } from "../utils/commonPath";
import { getItem } from "../utils/token";

const localStorageKey = "__auth__provider_token__";

const getToken = () => getItem(localStorageKey);

const login = (data: { username: string; password: string }) => {
  return request("/v1/auth/login", { method: "POST", data });
};

const register = (data: { username: string; password: string }) => {
  return request("/v1/auth/register", { method: "POST", data }).then(() => {
    message.success("注册成功！去登录吧！");
  });
};

const logout = async () => window.localStorage.removeItem(localStorageKey);

export { getToken, login, register, logout, localStorageKey };
