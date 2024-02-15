import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AuthAction from "./ActionsSlicers/AuthScreenActionSlicer";
import modalReducer from "./ActionsSlicers/UIModalsActions";
import AuthActions from "./ActionsSlicers/AuthLoginSlicer";
import loginHistory from "./ActionsSlicers/LoginHistorySlicer";

const rootReducer = combineReducers({
  Auth: AuthAction,
  modal: modalReducer,
  AuthActions: AuthActions,
  loginHistory: loginHistory,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;
