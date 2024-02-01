import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AuthAction from "./ActionsSlicers/AuthAction";
import modalReducer from "./ActionsSlicers/UIModalsActions";

const rootReducer = combineReducers({
  Auth: AuthAction,
  modal: modalReducer,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;
