import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  searchOrganization,
  getAllOrganization,
} from "../../common/apis/Api_Config";
import { adminURL } from "../../common/apis/Api_endPoints";
import { viewOrganizationLoader } from "../ActionsSlicers/ViewOrganizationActionSlicer";

export const searchOrganizationApi = createAsyncThunk(
  "searchOragnization/searchOragnization",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    console.log(requestData, "requestDatarequestData");
    let { data, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append("RequestMethod", searchOrganization.RequestMethod);

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
                "Admin_AdminServiceManager_SearchOrganization_01".toLowerCase()
              )
          ) {
            dispatch(viewOrganizationLoader(false));
            try {
              return {
                result: response.data.responseResult,
                code: "SearchOrganization_01",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_SearchOrganization_02".toLowerCase()
              )
          ) {
            dispatch(viewOrganizationLoader(false));
            return rejectWithValue("No data available");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_SearchOrganization_03".toLowerCase()
              )
          ) {
            dispatch(viewOrganizationLoader(false));
            return rejectWithValue("Something-went-wrong");
          } else {
            dispatch(viewOrganizationLoader(false));
            return rejectWithValue("Something-went-wrong");
          }
        } else {
          dispatch(viewOrganizationLoader(false));
          return rejectWithValue("Something-went-wrong");
        }
      } else {
        dispatch(viewOrganizationLoader(false));
        return rejectWithValue("Something-went-wrong");
      }
    } catch (error) {
      return rejectWithValue("Something-went-wrong");
    }
  }
);

// for get All Organization API

export const getAllOrganizationApi = createAsyncThunk(
  "getAllOrganization/getAllOrganization",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestMethod", getAllOrganization.RequestMethod);
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
                "Admin_AdminServiceManager_GetAllOrganization_01".toLowerCase()
              )
          ) {
            dispatch(viewOrganizationLoader(false));
            try {
              return {
                result: response.data.responseResult,
                code: "GetAllOrganization_01",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetAllOrganization_02".toLowerCase()
              )
          ) {
            dispatch(viewOrganizationLoader(false));
            return rejectWithValue("No data available");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetAllOrganization_03".toLowerCase()
              )
          ) {
            dispatch(viewOrganizationLoader(false));
            return rejectWithValue("Something-went-wrong");
          } else {
            dispatch(viewOrganizationLoader(false));
            return rejectWithValue("Something-went-wrong");
          }
        } else {
          dispatch(viewOrganizationLoader(false));
          return rejectWithValue("Something-went-wrong");
        }
      } else {
        dispatch(viewOrganizationLoader(false));
        return rejectWithValue("Something-went-wrong");
      }
    } catch (error) {
      return rejectWithValue("Something-went-wrong");
    }
  }
);
