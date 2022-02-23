import { Result } from "antd";
import { User } from "screens/project-list/search-panel";
import { request } from "utils/request";
import { apiUrl } from "../utils/commonPath";
import { getItem } from "../utils/token";

const localStorageKey = "__auth__provider_token__";

const getToken = () => getItem(localStorageKey);

const handleUserResponse = ({ data: user }: { data: User }) => {
  window.localStorage.setItem(localStorageKey, user.token ?? "");
  return user;
};

const login = (data: { username: string; password: string }) => {
  return request("/v1/auth/login", { method: "POST", data }).then((data: any) =>
    handleUserResponse(data)
  );
  // return fetch(`${apiUrl}/login`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(data),
  // }).then(async (response) => {
  //   if (response.ok) {
  //     return handleUserResponse(await response.json());
  //   } else {
  //     return Promise.reject(await response.json());
  //   }
  // });
};

const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

const logout = async () => window.localStorage.removeItem(localStorageKey);

export { getToken, login, register, logout };
