import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./i18n";
import { store } from "./store/Store";
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  </Provider>
);

reportWebVitals();
