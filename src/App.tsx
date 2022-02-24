import React from "react";
import "./App.css";
import { useAuth } from "./context/auth-context";
import { UnauthenticatedApp } from "./unauthenticated-app";
import { AuthenticatedApp } from "./authenticated-app";

function App() {
  console.log("我进来了对不对");

  const { user } = useAuth();
  
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
