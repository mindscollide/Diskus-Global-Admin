import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AuthAction from "./ActionsSlicers/AuthAction";
import modalReducer from "./ActionsSlicers/UIModalsActions";
import EmailValidationReducer from "./ActionsSlicers/AuthLoginSlicer";

const rootReducer = combineReducers({
  Auth: AuthAction,
  modal: modalReducer,
  EmailValidation: EmailValidationReducer,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;
