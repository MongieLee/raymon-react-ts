import React, { ReactNode, useState } from "react";
import * as auth from "services/auth-provider";
import { User } from "screens/project-list/search-panel";
import { useMount } from "../hooks/useMount";
import { message } from "antd";
import { request, Result } from "utils/request";
import { useAsync } from "hooks/useAsync";
import { FullPageLoading } from "components/lib";
import { localStorageKey } from "services/auth-provider";

interface AuthForm {
  username: string;
  password: string;
}

export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    // const data = await http("userInfo", { token });
    // user = data.user;
    const data = await request("/v1/user/info", { method: "GET" });
    user = (data as Result<User>).data;
  }
  return user;
};

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

const handleUserResponse = ({ token }: { token: string }) => {
  token && window.localStorage.setItem(localStorageKey, token);
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [user, setUser] = useState<User | null>(null);
  const {
    run,
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    setData: setUser,
  } = useAsync<User | null>();
  const register = (form: AuthForm) => auth.register(form);
  const login = (form: AuthForm) =>
    auth.login(form).then((data: any) => {
      handleUserResponse(data);
    });
  const logout = () =>
    auth.logout().then(() => {
      setUser(null);
    });

  useMount(() => {
    run(bootstrapUser());
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout, setUser }}
    />
  );
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("userAuth必须在AuthProvider中使用");
  }
  return context;
};

export { AuthProvider, useAuth };
