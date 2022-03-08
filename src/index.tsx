import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.less";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AppProviders } from "./context";

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
