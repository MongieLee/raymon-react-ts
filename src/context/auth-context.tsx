import React, {ReactNode, useState} from "react";
import * as auth from "services/auth-provider";
import {User} from "screens/project-list/search-panel";
import {http} from "../utils/http";
import {useMount} from "../hooks/useMount";

interface AuthForm {
  username: string,
  password: string
}

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("userInfo", {token});
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<{
  user: User | null,
  register: (data: AuthForm) => Promise<void>
  login: (data: AuthForm) => Promise<void>
  logout: () => void
} | undefined>(undefined);
AuthContext.displayName = "AuthContext";

const AuthProvider = ({children}: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    bootstrapUser().then(setUser);
  });

  return (
    <AuthContext.Provider
      children={children}
      value={{user, login, register, logout}}
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

export {AuthProvider, useAuth};