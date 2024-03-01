import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { adminURL, excelURL } from "../../common/apis/Api_endPoints";
import {
  GetAllBillingDue,
  OrganizationsByActiveLicense,
  TotalThisMonthDue,
  statsOfActiveLicenses,
  statOrganizationBySubType,
  dashboardBillingDueReport,
  OrganizationBySubscriptiontype,
} from "../../common/apis/Api_Config";
import { globalAdminDashBoardLoader } from "../ActionsSlicers/GlobalAdminDasboardSlicer";

//StatsOfActiveLicense  Api
export const StatsOfActiveLicenseApi = createAsyncThunk(
  "globalAdminDashboard/globalAdminDashboard",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestMethod", statsOfActiveLicenses.RequestMethod);
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
                "Admin_AdminServiceManager_StatsOfTotalActiveLisences_01".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            try {
              return {
                result: response.data.responseResult,
                code: "StatsOfTotalActiveLisences_01",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_StatsOfTotalActiveLisences_02".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("No data available");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_StatsOfTotalActiveLisences_03".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("Something-went-wrong");
          } else {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("Something-went-wrong");
          }
        } else {
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue("Something-went-wrong");
        }
      } else {
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue("Something-went-wrong");
      }
    } catch (error) {
      return rejectWithValue("Something-went-wrong");
    }
  }
);

//OrganizationStatsBySubscriptionType API in Organizer Graph
export const organziationStatsBySubscriptionApi = createAsyncThunk(
  "organziationStatsBySubscriptionApi/organziationStatsBySubscriptionApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestMethod", statOrganizationBySubType.RequestMethod);
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
                "Admin_AdminServiceManager_StatsOfOrganizationsBySubscriptionType_01".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            try {
              return {
                result: response.data.responseResult,
                code: "StatsOfTotalActiveLisences_01",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_StatsOfOrganizationsBySubscriptionType_02".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("No data available");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_StatsOfOrganizationsBySubscriptionType_03".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("Something-went-wrong");
          } else {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("Something-went-wrong");
          }
        } else {
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue("Something-went-wrong");
        }
      } else {
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue("Something-went-wrong");
      }
    } catch (error) {
      return rejectWithValue("Something-went-wrong");
    }
  }
);

//OrganizationsByActiveLicense APi
export const OrganizationsByActiveLicenseApi = createAsyncThunk(
  "OrganizationsByActiveLicenseApi/OrganizationsByActiveLicenseApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { data, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append("RequestMethod", OrganizationsByActiveLicense.RequestMethod);
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
                "Admin_AdminServiceManager_ListOfAllTheActiveOrganizationWiseLisences_01".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            try {
              return {
                result: response.data.responseResult,
                code: "ListOfAllTheActiveOrganizationWiseLisences_01",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_ListOfAllTheActiveOrganizationWiseLisences_02".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("No data available");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_ListOfAllTheActiveOrganizationWiseLisences_03".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("Something-went-wrong");
          } else {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("Something-went-wrong");
          }
        } else {
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue("Something-went-wrong");
        }
      } else {
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue("Something-went-wrong");
      }
    } catch (error) {
      return rejectWithValue("Something-went-wrong");
    }
  }
);

//GetAllBillingDue Api
export const GetAllBillingDueApi = createAsyncThunk(
  "GetAllBillingDueApi/GetAllBillingDueApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { data, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append("RequestMethod", GetAllBillingDue.RequestMethod);
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
                "Admin_AdminServiceManager_GetAllBillingDue_01".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            try {
              return {
                result: response.data.responseResult,
                code: "GetAllBillingDue_01",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetAllBillingDue_02".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("No data available");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetAllBillingDue_03".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("Something-went-wrong");
          } else {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("Something-went-wrong");
          }
        } else {
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue("Something-went-wrong");
        }
      } else {
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue("Something-went-wrong");
      }
    } catch (error) {
      return rejectWithValue("Something-went-wrong");
    }
  }
);

//TotalThisMonthDue Api
export const TotalThisMonthDueApi = createAsyncThunk(
  "TotalThisMonthDue/TotalThisMonthDue",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { data, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append("RequestMethod", TotalThisMonthDue.RequestMethod);
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
                "Admin_AdminServiceManager_TotalThisMonthDue_01".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            try {
              return {
                result: response.data.responseResult,
                code: "TotalThisMonthDue_01",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_TotalThisMonthDue_02".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("No data available");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_TotalThisMonthDue_03".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("Something-went-wrong");
          } else {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("Something-went-wrong");
          }
        } else {
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue("Something-went-wrong");
        }
      } else {
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue("Something-went-wrong");
      }
    } catch (error) {
      return rejectWithValue("Something-went-wrong");
    }
  }
);

//Blling Due Report
export const dashBoardReportApi = createAsyncThunk(
  "dashboardBillingDue/dashboardBillingDue",
  async (requestData, { rejectWithValue, dispatch }) => {
    try {
      let token = localStorage.getItem("token");
      let { data } = requestData;
      let form = new FormData();
      form.append("RequestMethod", dashboardBillingDueReport.RequestMethod);
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
        dispatch(globalAdminDashBoardLoader(false));
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

//OrganizationBySubscriptionType Api
export const OrganizationSubscriptionTypeApi = createAsyncThunk(
  "OrganizationSubscriptionTypeApi/OrganizationSubscriptionTypeApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { userData, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(userData));
    form.append("RequestMethod", OrganizationBySubscriptiontype.RequestMethod);
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
                "Admin_AdminServiceManager_OrganizationsBySubscriptionType_01".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            try {
              return {
                result: response.data.responseResult,
                code: "OrganizationsBySubscriptionType_01",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_OrganizationsBySubscriptionType_02".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("No data available");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_OrganizationsBySubscriptionType_03".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("Something-went-wrong");
          } else {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("Something-went-wrong");
          }
        } else {
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue("Something-went-wrong");
        }
      } else {
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue("Something-went-wrong");
      }
    } catch (error) {
      return rejectWithValue("Something-went-wrong");
    }
  }
);
