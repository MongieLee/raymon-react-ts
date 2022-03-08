import React, { ReactNode } from "react";
import * as auth from "services/auth-provider";
import { useMount } from "../hooks/useMount";
import { request } from "utils/request";
import { useAsync } from "hooks/useAsync";
import { FullPageLoading } from "components/lib";
import { localStorageKey } from "services/auth-provider";
import { log } from "console";
interface AuthForm {
  username: string;
  password: string;
}

// 获取当前用户信息，会判断当前token是否存在
export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();

  if (token) {
    const data = await request("/v1/user/info", { method: "GET" });
    user = (data as Result<User>).data;
  }
  return user;
};

// 创建React上下文
const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (data: AuthForm) => Promise<void>;
      login: (data: AuthForm) => Promise<void>;
      logout: () => void;
      setUser: (user: User | null) => void;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

// 更新token
const handleUserResponse = (token: string) => {
  window.localStorage.setItem(localStorageKey, token);
};

// Content的Provider容器
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    run,
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    setData: setUser,
  } = useAsync<User | null>(); // 从hooks中取出状态和方法等

  // 注册方法
  const register = (form: AuthForm) => auth.register(form);

  // 登录方法，并处理全局user状态
  const login = (form: AuthForm) =>
    auth.login(form).then(({ data }) => {
      handleUserResponse(data!.token);
    });

  // 登出方法
  const logout = () =>
    auth.logout().then(() => {
      setUser(null);
    });

  // 组件初次渲染时会判断是否有token，如果有则自动更新user状态
  useMount(() => {
    run(bootstrapUser());
  });

  // 如果是空闲或者loading状态时，显示全局的Loading组件
  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  // 非空闲及非loading时显示被包裹的子组件
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout, setUser }}
    />
  );
};

// 从AuthContext.Provider的value中取出传入的对象并返回
const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("userAuth必须在AuthProvider中使用");
  }
  return context;
};

export { AuthProvider, useAuth };
