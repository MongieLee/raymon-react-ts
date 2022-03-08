import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";

// Content最外层的Provider组件
export const AppProviders = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
