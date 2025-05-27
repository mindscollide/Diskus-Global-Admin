import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  AuditTrialReport,
  billingDueReport,
  loginHistory,
} from "../../common/apis/Api_Config";
import { adminURL, excelURL } from "../../common/apis/Api_endPoints";
import { loginHistoryLoader } from "../ActionsSlicers/LoginHistorySlicer";

export const LoginHistoryAPI = createAsyncThunk(
  "LoginHistory/LoginHistory",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    console.log(requestData, "requestDatarequestData");
    let { data, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append("RequestMethod", loginHistory.RequestMethod);

    try {
      // dispatch()
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
            dispatch(loginHistoryLoader(false));
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
            dispatch(loginHistoryLoader(false));

            return rejectWithValue("");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetUserLoginHistory_03".toLowerCase()
              )
          ) {
            dispatch(loginHistoryLoader(false));

            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(loginHistoryLoader(false));

            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(loginHistoryLoader(false));

          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(loginHistoryLoader(false));

        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

export const LogingHistoryReportApi = createAsyncThunk(
  "billingDueReport/billingDueReport",
  async (requestData, { rejectWithValue, dispatch }) => {
    try {
      let token = localStorage.getItem("token");
      let { data } = requestData;
      let form = new FormData();
      form.append("RequestMethod", billingDueReport.RequestMethod);
      form.append("RequestData", JSON.stringify(data));

      const response = await axios({
        method: "post",
        url: excelURL,
        data: form,
        headers: {
          _token: token,
          "Content-Disposition": "attachment; filename=template.xlsx",
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
        responseType: "blob",
      });

      if (response.status === 200) {
        // Create a temporary URL for the blob data
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Create a link element and simulate a click to trigger the download
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "download-security-reports.xlsx");
        document.body.appendChild(link);
        link.click();

        // Dispatch action to update loading state or handle other logic
        dispatch(loginHistoryLoader(false));
      } else {
        // Handle other status codes if needed
        return rejectWithValue("Error downloading file");
      }
    } catch (error) {
      // Handle errors
      return rejectWithValue(error.message);
    }
  }
);

// Audit Trial Report
export const AuditTrialReportApi = createAsyncThunk(
  "AuditTrialReportApi/AuditTrialReportApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    try {
      let token = localStorage.getItem("token");
      let { data } = requestData;
      let form = new FormData();
      form.append("RequestMethod", AuditTrialReport.RequestMethod);
      form.append("RequestData", JSON.stringify(data));

      const response = await axios({
        method: "post",
        url: excelURL,
        data: form,
        headers: {
          _token: token,
          "Content-Disposition": "attachment; filename=template.xlsx",
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
        responseType: "blob",
      });

      if (response.status === 200) {
        // Create a temporary URL for the blob data
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Create a link element and simulate a click to trigger the download
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "AuditTrialReport.xlsx");
        document.body.appendChild(link);
        link.click();

        // Dispatch action to update loading state or handle other logic
        dispatch(loginHistoryLoader(false));
      } else {
        // Handle other status codes if needed
        return rejectWithValue("Error downloading file");
      }
    } catch (error) {
      // Handle errors
      return rejectWithValue(error.message);
    }
  }
);
