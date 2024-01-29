import { configureStore } from "@reduxjs/toolkit";
import AuthAction from "./ActionsSlicers/AuthAction";
import modalReducer from "./ActionsSlicers/UIModalsActions";
const DiskusStore = configureStore({
  reducer: {
    Auth: AuthAction,
    modal: modalReducer,
  },
});
export default DiskusStore;
