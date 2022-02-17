import React from "react";
import {ProjectListScreen} from "./screens/project-list";
import {useAuth} from "./context/auth-context";

export const AuthenticatedApp = () => {
  const {logout} = useAuth();

  return (
    <>
      <ProjectListScreen/>
      <button onClick={logout}>注销</button>
    </>
  );
};