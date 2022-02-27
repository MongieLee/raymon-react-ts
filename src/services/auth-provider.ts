import { message } from "antd";
import { User } from "screens/project-list/search-panel";
import { request } from "utils/request";
import { apiUrl } from "../utils/commonPath";
import { getItem } from "../utils/token";
import { Result } from "utils/request";

const localStorageKey = "__auth__provider_token__";

const getToken = () => getItem(localStorageKey);



const login = (data: { username: string; password: string }) => {
  return request("/v1/auth/login", { method: "POST", data });
};

const register = (data: { username: string; password: string }) => {
  return request("/v1/auth/register", { method: "POST", data }).then(() => {
    message.success("注册成功！去登录吧！");
    // 这里不能写成默认renturen，success默认返回一个Promise会导致执行熟悉不符合预期
  });
};

// const logout = async () => window.localStorage.removeItem(localStorageKey);
const logout = async () => null;

export { getToken, login, register, logout, localStorageKey };
