import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  getSystemSupportedLanguage,
  getLastSelectedLanguage,
  setLastSelectedLanguage,
} from "../../common/apis/Api_Config";
import { adminURL } from "../../common/apis/Api_endPoints";
import { languageLoader } from "../ActionsSlicers/LanguageSlicer";

export const getSystemLanguageMainApi = createAsyncThunk(
  "getSystemLanguageMainApi/getSystemLanguageMainApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { data, navigate, t } = requestData;
    let form = new FormData();
    // form.append("RequestData", JSON.stringify(data));
    form.append("RequestMethod", getSystemSupportedLanguage.RequestMethod);

    try {
      const response = await axios({
        method: "post",
        url: adminURL,
        data: form,
        headers: {
          _token: token,
        },
      });

      if (response.data.responseCode === 417) {
      } else if (response.data.responseCode === 200) {
        if (response.data.responseResult.isExecuted === true) {
          if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetSystemSupportedLanguage_01".toLowerCase()
              )
          ) {
            dispatch(languageLoader(false));
            console.log(
              response.data.responseResult.systemSupportedLanguages,
              "systemSupportedLanguagessystemSupportedLanguages"
            );
            let languagesData =
              response.data.responseResult.systemSupportedLanguages;
            console.log(
              languagesData,
              "systemSupportedLanguagessystemSupportedLanguages"
            );
            try {
              return {
                result: languagesData,
                code: t("Record-found"),
              };
            } catch (error) {
              console.log(
                error,
                "systemSupportedLanguagessystemSupportedLanguages"
              );
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetSystemSupportedLanguage_02".toLowerCase()
              )
          ) {
            dispatch(languageLoader(false));

            return rejectWithValue("No Records Found");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetSystemSupportedLanguage_03".toLowerCase()
              )
          ) {
            dispatch(languageLoader(false));

            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(languageLoader(false));

            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(languageLoader(false));

          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(languageLoader(false));

        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      dispatch(languageLoader(false));

      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

// get Last Selected Main Api
export const getLastLanguageMainApi = createAsyncThunk(
  "getLastLanguageMainApi/getLastLanguageMainApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { data, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append("RequestMethod", getLastSelectedLanguage.RequestMethod);

    try {
      const response = await axios({
        method: "post",
        url: adminURL,
        data: form,
        headers: {
          _token: token,
        },
      });

      if (response.data.responseCode === 417) {
      } else if (response.data.responseCode === 200) {
        if (response.data.responseResult.isExecuted === true) {
          if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetLastSelectedLanguage_01".toLowerCase()
              )
          ) {
            dispatch(languageLoader(false));
            try {
              return {
                result: response.data.responseResult.userSelectedLanguage,
                code: t("Record-found"),
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetLastSelectedLanguage_02".toLowerCase()
              )
          ) {
            dispatch(languageLoader(false));

            return rejectWithValue("No Records Found");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetLastSelectedLanguage_03".toLowerCase()
              )
          ) {
            dispatch(languageLoader(false));

            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(languageLoader(false));

            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(languageLoader(false));

          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(languageLoader(false));

        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

//set Last Selected Main Api
export const setLastSelectedLanguageMainApi = createAsyncThunk(
  "setLastSelectedLanguageMainApi/setLastSelectedLanguageMainApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { data, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append("RequestMethod", setLastSelectedLanguage.RequestMethod);

    try {
      const response = await axios({
        method: "post",
        url: adminURL,
        data: form,
        headers: {
          _token: token,
        },
      });

      if (response.data.responseCode === 417) {
      } else if (response.data.responseCode === 200) {
        if (response.data.responseResult.isExecuted === true) {
          if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_SetLastSelectedLanguage_01".toLowerCase()
              )
          ) {
            dispatch(languageLoader(false));
            // localStorage.setItem("currentLanguage", "en");

            try {
              return {
                result: response.data.responseResult,
                code: t("Record-updated"),
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_SetLastSelectedLanguage_02".toLowerCase()
              )
          ) {
            dispatch(languageLoader(false));

            return rejectWithValue("Record-not-saved");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_SetLastSelectedLanguage_03".toLowerCase()
              )
          ) {
            dispatch(languageLoader(false));

            try {
              return {
                result: response.data.responseResult,
                code: t("Record-Saved"),
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_SetLastSelectedLanguage_04".toLowerCase()
              )
          ) {
            dispatch(languageLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(languageLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(languageLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(languageLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);
