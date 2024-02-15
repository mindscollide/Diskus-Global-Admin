import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loginHistory } from "../../common/apis/Api_Config";
import { adminURL } from "../../common/apis/Api_endPoints";

export const LoginHistoryAPI = createAsyncThunk(
  "LoginHistory/LoginHistory",
  async (requestData, { rejectWithValue }) => {
    let token = localStorage.getItem("token");
    console.log(requestData, "requestDatarequestData");
    let { data, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append("RequestMethod", loginHistory.RequestMethod);

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
                "Admin_AdminServiceManager_GetUserLoginHistory_01".toLowerCase()
              )
          ) {
            try {
              return {
                result: response.data.responseResult,
                code: "GetUserLoginHistory_01",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetUserLoginHistory_02".toLowerCase()
              )
          ) {
            return rejectWithValue("No data available");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetUserLoginHistory_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Something-went-wrong");
          } else {
            return rejectWithValue("Something-went-wrong");
          }
        } else {
          return rejectWithValue("Something-went-wrong");
        }
      } else {
        return rejectWithValue("Something-went-wrong");
      }
    } catch (error) {
      return rejectWithValue("Something-went-wrong");
    }
  }
);