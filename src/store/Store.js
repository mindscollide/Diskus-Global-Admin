import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AuthAction from "./ActionsSlicers/AuthScreenActionSlicer";
import modalReducer from "./ActionsSlicers/UIModalsActions";
import AuthActions from "./ActionsSlicers/AuthLoginSlicer";

const rootReducer = combineReducers({
  Auth: AuthAction,
  modal: modalReducer,
  AuthActions: AuthActions,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;
