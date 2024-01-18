import { configureStore } from "@reduxjs/toolkit";
import AuthAction from "./AuthAction";
export const store = configureStore({
  reducer: {
    Auth: AuthAction,
  },
});
