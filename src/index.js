import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./i18n";
import { Provider } from "react-redux";

import DiskusStore from "./store/Store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={DiskusStore}>
    <App />
  </Provider>
);
