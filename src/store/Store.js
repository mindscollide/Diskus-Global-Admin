import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AuthAction from "./ActionsSlicers/AuthScreenActionSlicer";
import modalReducer from "./ActionsSlicers/UIModalsActions";
import AuthActions from "./ActionsSlicers/AuthLoginSlicer";
import loginHistory from "./ActionsSlicers/LoginHistorySlicer";
import searchOrganization from "./ActionsSlicers/ViewOrganizationActionSlicer";
import globalAdminDashboardReducer from "./ActionsSlicers/GlobalAdminDasboardSlicer";
import packageAdminReducer from "./ActionsSlicers/PackageSlicer";
import LanguageReducer from "./ActionsSlicers/LanguageSlicer";

const rootReducer = combineReducers({
  Auth: AuthAction,
  modal: modalReducer,
  AuthActions: AuthActions,
  loginHistory: loginHistory,
  searchOrganization: searchOrganization,
  globalAdminDashboardReducer: globalAdminDashboardReducer,
  packageAdminReducer: packageAdminReducer,
  LanguageReducer: LanguageReducer,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;
