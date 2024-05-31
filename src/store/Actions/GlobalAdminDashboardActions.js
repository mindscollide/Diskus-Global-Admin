import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  adminURL,
  authenticationURL,
  excelURL,
} from "../../common/apis/Api_endPoints";
import {
  GetAllBillingDue,
  OrganizationsByActiveLicense,
  TotalThisMonthDue,
  statsOfActiveLicenses,
  statOrganizationBySubType,
  dashboardBillingDueReport,
  OrganizationBySubscriptiontype,
  UpdateAllOrganizationLevelConfiguration,
  GetSystemConfigurations,
  UpdatePackagePriceGlobalAdmin,
  GetAllPackagesWithFeaturesGlobalAdmin,
  sendInvoice,
  ChangePassword,
  cashInFlow,
  cashOutFlow,
  trialDashboardApi,
  trialExtendedDashboardApi,
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

//Send Invoice APi
export const SendInvoiceApi = createAsyncThunk(
  "SendInvoiceApi/SendInvoiceApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { data } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append("RequestMethod", sendInvoice.RequestMethod);
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
                "Admin_AdminServiceManager_SendInvoice_01".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            try {
              return {
                result: response.data.responseResult,
                code: "SendInvoice_01",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_SendInvoice_02".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("Failed-to-send-Invoice");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_SendInvoice_03".toLowerCase()
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

//GetAllPackagesWithFeaturesGlobalAdmin Api
export const GetAllPackagesWithFeaturesGlobalAdminApi = createAsyncThunk(
  "GetAllPackagesWithFeaturesGlobalAdminApi/GetAllPackagesWithFeaturesGlobalAdminApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { userData, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(userData));
    form.append(
      "RequestMethod",
      GetAllPackagesWithFeaturesGlobalAdmin.RequestMethod
    );
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
                "Admin_AdminServiceManager_GetAllPackagesWithFeaturesGlobalAdmin_01".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            try {
              return {
                result: response.data.responseResult,
                code: "GetAllPackagesWithFeaturesGlobalAdmin_01",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetAllPackagesWithFeaturesGlobalAdmin_02".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("Failed-to-update");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetAllPackagesWithFeaturesGlobalAdmin_03".toLowerCase()
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

//UpdatePackagePriceGlobalAdmin Api
export const UpdatePackagePriceGlobalAdminApi = createAsyncThunk(
  "UpdatePackagePriceGlobalAdmin/UpdatePackagePriceGlobalAdmin",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { userData, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(userData));
    form.append("RequestMethod", UpdatePackagePriceGlobalAdmin.RequestMethod);
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
                "Admin_AdminServiceManager_UpdatePackagePriceGlobalAdmin_01".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            try {
              return {
                result: response.data.responseResult,
                code: "UpdatePackagePriceGlobalAdmin_01",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_UpdatePackagePriceGlobalAdmin_02".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("Failed-to-update");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_UpdatePackagePriceGlobalAdmin_03".toLowerCase()
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

//GetSystemConfigurations Api
export const GetSystemConfigurationsApi = createAsyncThunk(
  "GetSystemConfigurationsApi/GetSystemConfigurationsApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { userData, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(userData));
    form.append("RequestMethod", GetSystemConfigurations.RequestMethod);
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
                "Admin_AdminServiceManager_GetAllOrganizationLevelConfiguration_01".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            try {
              return {
                result: response.data.responseResult,
                code: "GetAllOrganizationLevelConfiguration_01",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetAllOrganizationLevelConfiguration_02".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("No-data-available");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetAllOrganizationLevelConfiguration_03".toLowerCase()
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

//UpdateAllOrganizationLevelConfiguration
export const UpdateAllOrganizationLevelConfigurationApi = createAsyncThunk(
  "UpdateAllOrganizationLevelConfigurationApi/UpdateAllOrganizationLevelConfigurationApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { userData, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(userData));
    form.append(
      "RequestMethod",
      UpdateAllOrganizationLevelConfiguration.RequestMethod
    );
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
                "Admin_AdminServiceManager_UpdateAllOrganizationLevelConfiguration_01".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            try {
              return {
                result: response.data.responseResult,
                code: "UpdateAllOrganizationLevelConfiguration_01",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_UpdateAllOrganizationLevelConfiguration_02".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("Failed-to-update");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_UpdateAllOrganizationLevelConfiguration_03".toLowerCase()
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

//Change Password Screen

export const ChangePasswordApi = createAsyncThunk(
  "ChangePasswordApi/ChangePasswordApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { data } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append("RequestMethod", ChangePassword.RequestMethod);
    try {
      const response = await axios({
        method: "post",
        url: authenticationURL,
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
                "ERM_AuthService_AuthManager_ChangePassword_01".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            try {
              return {
                result: response.data.responseResult,
                code: "ChangePassword_01",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_ChangePassword_02".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("No-password-updated");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_ChangePassword_03".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("No-password-updated");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_ChangePassword_04".toLowerCase()
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

//get cashInflow API
export const getCashFlowMainApi = createAsyncThunk(
  "getCashFlowMainApi/getCashFlowMainApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { data, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append("RequestMethod", cashInFlow.RequestMethod);
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
                "Admin_AdminServiceManager_GetCashFlows_01".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            try {
              return {
                result: response.data.responseResult,
                code: "getCashFlow_01",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetCashFlows_02".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("No data available");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetCashFlows_03".toLowerCase()
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

//get cashOutflow API
export const getCashOutStandingFlowMainApi = createAsyncThunk(
  "getCashOutStandingFlowMainApi/getCashOutStandingFlowMainApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { data, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append("RequestMethod", cashOutFlow.RequestMethod);
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
                "Admin_AdminServiceManager_GetCashOutFlows_01".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            try {
              return {
                result: response.data.responseResult,
                code: "getcashOutFlow_01",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetCashOutFlows_02".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("No data available");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetCashOutFlows_03".toLowerCase()
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

//get TrialFlow API
export const getListTrialSubscription = createAsyncThunk(
  "getListTrialSubscription/getListTrialSubscription",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { data, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append("RequestMethod", trialDashboardApi.RequestMethod);
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
                "Admin_AdminServiceManager_ListOfTrialSubscriptions_01".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            try {
              return {
                result: response.data.responseResult,
                code: "ListOfTrialSubscriptions_01",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_ListOfTrialSubscriptions_02".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("No data available");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_ListOfTrialSubscriptions_03".toLowerCase()
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

// get TrialExtendedFlow API
export const getListOfExtendedTrailSubscriptions = createAsyncThunk(
  "getListOfExtendedTrailSubscriptions/getListOfExtendedTrailSubscriptions ",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { data, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append("RequestMethod", trialExtendedDashboardApi.RequestMethod);
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
                "Admin_AdminServiceManager_ListOfExtendedTrailSubscriptions_01".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            try {
              return {
                result: response.data.responseResult,
                code: "ListOfExtendedTrailSubscriptions_01",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_ListOfExtendedTrailSubscriptions_02".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("No data available");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_ListOfExtendedTrailSubscriptions_03".toLowerCase()
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
