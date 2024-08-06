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
  listOfSubscribedSubscriptionsApi,
  listOfExpiredSubscriptionsApi,
  trialRenewModal,
  downloadTrialSubscribedReport,
  downloadTrialExtendedReport,
  downloadExpiredTrialSubscriptionReport,
  getPackageDetailsModal,
  UpdateGlobalAdminUser,
  downloadTrialReport,
  getInvoiceHtmlOrganization,
  getAllListOrganizationEssentialLisences,
  getAllListOrganizationProfessionalLisences,
  getAllListOrganizationPremiumLisences,
  downloadEssentialReport,
  downloadProfessionalReport,
  downloadPremiumReport,
  getGlobalLevelConfiguration,
  updateGlobalLevelConfiguration,
  getAllPackages,
  listOfPackageLisences,
  getAllOrganizationNamesApi,
  dynamicallyReportOfActivePackageLicensesApi,
  downloadInvoiceApi,
  getUserInfoApi,
} from "../../common/apis/Api_Config";
import { globalAdminDashBoardLoader } from "../ActionsSlicers/GlobalAdminDasboardSlicer";
import {
  dashboardSendInvoiceOpenModal,
  htmlInvoiceModalOpen,
  trialRenewOpenModal,
  userConifrmationOpenModal,
} from "../ActionsSlicers/UIModalsActions";

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
            return rejectWithValue("");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_StatsOfTotalActiveLisences_03".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
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
            return rejectWithValue("");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_StatsOfOrganizationsBySubscriptionType_03".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
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
            return rejectWithValue("");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_ListOfAllTheActiveOrganizationWiseLisences_03".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
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
            return rejectWithValue("");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetAllBillingDue_03".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
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
            return rejectWithValue("");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_TotalThisMonthDue_03".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
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
            return rejectWithValue("");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_OrganizationsBySubscriptionType_03".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

//Send Invoice APi
export const SendInvoiceApi = createAsyncThunk(
  "SendInvoiceApi/SendInvoiceApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { data, navigate, t } = requestData;
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
            return rejectWithValue(t("Failed-to-send-Invoice"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_SendInvoice_03".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
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
            return rejectWithValue(t("Failed-to-update"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetAllPackagesWithFeaturesGlobalAdmin_03".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
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
            return rejectWithValue(t("Failed-to-update"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_UpdatePackagePriceGlobalAdmin_03".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

//GetSystemConfigurations Api
export const GetSystemConfigurationsApi = createAsyncThunk(
  "GetSystemConfigurationsApi/GetSystemConfigurationsApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { navigate, t } = requestData;
    let form = new FormData();
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
            return rejectWithValue("");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetAllOrganizationLevelConfiguration_03".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

//UpdateAllOrganizationLevelConfiguration
export const UpdateAllOrganizationLevelConfigurationApi = createAsyncThunk(
  "UpdateAllOrganizationLevelConfigurationApi/UpdateAllOrganizationLevelConfigurationApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { data, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
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
            dispatch(GetSystemConfigurationsApi({ navigate, t }));
            dispatch(globalAdminDashBoardLoader(false));
            try {
              return {
                result: response.data.responseResult,
                code: t("Updated-Successfully"),
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
            return rejectWithValue(t("Failed-to-update"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_UpdateAllOrganizationLevelConfiguration_03".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

//Change Password Screen

export const ChangePasswordApi = createAsyncThunk(
  "ChangePasswordApi/ChangePasswordApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { data, t } = requestData;
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
                "ERM_AuthService_AuthManager_ChangePasswordGlobalAdmin_01".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            try {
              return {
                result: response.data.responseResult,
                code: t("Updated-Successfully"),
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_ChangePasswordGlobalAdmin_02".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Failed-to-update"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_ChangePasswordGlobalAdmin_03".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("No-password-updated"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_ChangePassword_04".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
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
            return rejectWithValue("");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetCashFlows_03".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
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
            return rejectWithValue("");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetCashOutFlows_03".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
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
            return rejectWithValue("");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_ListOfTrialSubscriptions_03".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
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
            return rejectWithValue("");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_ListOfExtendedTrailSubscriptions_03".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

// get TrialExtendedFlow API
export const getListOfSubscribedSubscriptions = createAsyncThunk(
  "getListOfSubscribedSubscriptions/getListOfSubscribedSubscriptions ",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { data, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append(
      "RequestMethod",
      listOfSubscribedSubscriptionsApi.RequestMethod
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
                "Admin_AdminServiceManager_ListOfSubscribedSubscriptions_01".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            try {
              return {
                result: response.data.responseResult,
                code: "ListOfSubscribedSubscriptions_01",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_ListOfSubscribedSubscriptions_02".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_ListOfSubscribedSubscriptions_03".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

// get TrialExtendedFlow API
export const getListOfExpiredSubscriptions = createAsyncThunk(
  "getListOfExpiredSubscriptions/getListOfExpiredSubscriptions ",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { data, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append("RequestMethod", listOfExpiredSubscriptionsApi.RequestMethod);
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
                "Admin_AdminServiceManager_ListOfExpiredSubscriptions_01".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            try {
              return {
                result: response.data.responseResult,
                code: "ListOfExpiredSubscriptions_01",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_ListOfExpiredSubscriptions_02".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_ListOfExpiredSubscriptions_03".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

// get TrialExtendedFlow API
export const trialRenewApi = createAsyncThunk(
  "trialRenewApi/trialRenewApi ",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { data, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append("RequestMethod", trialRenewModal.RequestMethod);
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
              .includes("Admin_AdminServiceManager_TrailRenew_01".toLowerCase())
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            dispatch(trialRenewOpenModal(false));
            // let data = {
            //   OrganizationName: "",
            //   PageNumber: 1,
            //   length: 15,
            // };
            // dispatch(getListTrialSubscription({ data, navigate, t }));
            try {
              return {
                result: response.data.responseResult,
                code: "TrailRenew_01",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes("Admin_AdminServiceManager_TrailRenew_02".toLowerCase())
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes("Admin_AdminServiceManager_TrailRenew_03".toLowerCase())
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

// for downlaod extended Trial Report
export const trialExtendedReportApi = createAsyncThunk(
  "trialExtendedReportApi/trialExtendedReportApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    try {
      let token = localStorage.getItem("token");
      let { data } = requestData;
      let form = new FormData();
      form.append("RequestMethod", downloadTrialExtendedReport.RequestMethod);
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
        link.setAttribute("download", "download-Extented-reports.xlsx");
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

// for download Subscribe Trial Report
export const trialSubscribeReportApi = createAsyncThunk(
  "trialSubscribeReportApi/trialSubscribeReportApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    try {
      let token = localStorage.getItem("token");
      let { data } = requestData;
      let form = new FormData();
      form.append("RequestMethod", downloadTrialSubscribedReport.RequestMethod);
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
        link.setAttribute("download", "download-Subscribe-reports.xlsx");
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

// for download Expired Subscription Trial Report
export const trialSubscribeExpiredReportApi = createAsyncThunk(
  "trialSubscribeExpiredReportApi/trialSubscribeExpiredReportApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    try {
      let token = localStorage.getItem("token");
      let { data } = requestData;
      let form = new FormData();
      form.append(
        "RequestMethod",
        downloadExpiredTrialSubscriptionReport.RequestMethod
      );
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
        link.setAttribute(
          "download",
          "download-Subscription-Expired-reports.xlsx"
        );
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

// for getPackageDetailModal Api
export const getPackageDetailGlobalApi = createAsyncThunk(
  "getPackageDetailGlobalApi/getPackageDetailGlobalApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { data, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append("RequestMethod", getPackageDetailsModal.RequestMethod);
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
                "Admin_AdminServiceManager_GetPackageDetailsForGlobalAdmin_01".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            dispatch(dashboardSendInvoiceOpenModal(true));

            try {
              return {
                result: response.data.responseResult,
                code: "GetPackageDetailsForGlobalAdmin",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetPackageDetailsForGlobalAdmin_02".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetPackageDetailsForGlobalAdmin_03".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

// for update User Modal Api
export const UpdateGlobalAdminUserApi = createAsyncThunk(
  "UpdateGlobalAdminUserApi/UpdateGlobalAdminUserApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { data, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append("RequestMethod", UpdateGlobalAdminUser.RequestMethod);
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
                "ERM_AuthService_AuthManager_UpdateGlobalAdminUser_01".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            try {
              dispatch(userConifrmationOpenModal(false));

              return {
                result: response.data.responseResult,
                code: t("Updated-Successfully"),
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_UpdateGlobalAdminUser_02".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_UpdateGlobalAdminUser_03".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

// for download  Trial Report
export const trialReportExportApi = createAsyncThunk(
  "trialReportExportApi/trialReportExportApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    try {
      let token = localStorage.getItem("token");
      let { data } = requestData;
      let form = new FormData();
      form.append("RequestMethod", downloadTrialReport.RequestMethod);
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
        link.setAttribute("download", "download-Trial-reports.xlsx");
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

// for Html modal on dashboard in sendInvoice
export const getInvoiceHtmlApi = createAsyncThunk(
  "getInvoiceHtmlApi/getInvoiceHtmlApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { data, navigate, t, setSendInvoiceData } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append("RequestMethod", getInvoiceHtmlOrganization.RequestMethod);
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
                "Admin_AdminServiceManager_GetInvoiceHtmlByOrganizationID_01".toLowerCase()
              )
          ) {
            setSendInvoiceData(data);
            dispatch(htmlInvoiceModalOpen(true));
            dispatch(globalAdminDashBoardLoader(false));
            try {
              return {
                result: response.data.responseResult,
                code: "GetInvoiceHtmlByOrganizationID",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetInvoiceHtmlByOrganizationID_02".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("Failed to create string");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetInvoiceHtmlByOrganizationID_03".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

//get ListOfAllTheActiveOrganizationEssentialLisences in dashboard for essential Page
export const getAllListOrganizationEssentialApi = createAsyncThunk(
  "getAllListOrganizationEssentialApi/getAllListOrganizationEssentialApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { data, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append(
      "RequestMethod",
      getAllListOrganizationEssentialLisences.RequestMethod
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
                "Admin_AdminServiceManager_ListOfAllTheActiveOrganizationEssentialLisences_01".toLowerCase()
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
                "Admin_AdminServiceManager_ListOfAllTheActiveOrganizationEssentialLisences_02".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_ListOfAllTheActiveOrganizationEssentialLisences_03".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

//get ListOfAllTheActiveOrganizationProfessionalLisences in dashboard for Professional Page
export const getAllListOrganizationProfessionalApi = createAsyncThunk(
  "getAllListOrganizationProfessionalApi/getAllListOrganizationProfessionalApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { data, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append(
      "RequestMethod",
      getAllListOrganizationProfessionalLisences.RequestMethod
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
                "Admin_AdminServiceManager_ListOfAllTheActiveOrganizationProfessionalLisences_01".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            try {
              return {
                result: response.data.responseResult,
                code: "ListOfAllTheActiveOrganizationProfessionalLisences_01",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_ListOfAllTheActiveOrganizationProfessionalLisences_02".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_ListOfAllTheActiveOrganizationProfessionalLisences_03".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

//get ListOfAllTheActiveOrganizationPremiumLisences in dashboard for Premium tab Page
export const getAllListOrganizationPremiumApi = createAsyncThunk(
  "getAllListOrganizationPremiumApi/getAllListOrganizationPremiumApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { data, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append(
      "RequestMethod",
      getAllListOrganizationPremiumLisences.RequestMethod
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
                "Admin_AdminServiceManager_ListOfAllTheActiveOrganizationPremiumLisences_01".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            try {
              return {
                result: response.data.responseResult,
                code: "ListOfAllTheActiveOrganizationPremiumLisences_01",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_ListOfAllTheActiveOrganizationPremiumLisences_02".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_ListOfAllTheActiveOrganizationPremiumLisences_03".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

// for download  Essential Report
export const essentialDownloadExportApi = createAsyncThunk(
  "essentialDownloadExportApi/essentialDownloadExportApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    try {
      let token = localStorage.getItem("token");
      let { data } = requestData;
      let form = new FormData();
      form.append("RequestMethod", downloadEssentialReport.RequestMethod);
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
        link.setAttribute("download", "download-Essential-reports.xlsx");
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

// for download  Professional Report
export const professionalDownloadExportApi = createAsyncThunk(
  "professionalDownloadExportApi/professionalDownloadExportApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    try {
      let token = localStorage.getItem("token");
      let { data } = requestData;
      let form = new FormData();
      form.append("RequestMethod", downloadProfessionalReport.RequestMethod);
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
        link.setAttribute("download", "download-Professional-reports.xlsx");
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

// for download  Premium Report
export const premiumDownloadExportApi = createAsyncThunk(
  "premiumDownloadExportApi/premiumDownloadExportApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    try {
      let token = localStorage.getItem("token");
      let { data } = requestData;
      let form = new FormData();
      form.append("RequestMethod", downloadPremiumReport.RequestMethod);
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
        link.setAttribute("download", "download-Premium-reports.xlsx");
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

//getGlobalLevelConfigurationsApi Api
export const getGlobalLevelConfigurationsApi = createAsyncThunk(
  "getGlobalLevelConfigurationsApi/getGlobalLevelConfigurationsApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestMethod", getGlobalLevelConfiguration.RequestMethod);
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
                "Admin_AdminServiceManager_GetGlobalLevelConfiguration_01".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            try {
              return {
                result: response.data.responseResult,
                code: "GetGlobalLevelConfiguration_01",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetGlobalLevelConfiguration_02".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("No record found");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetGlobalLevelConfiguration_03".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

// Update Global Level Configuration Api
export const UpdateGlobalLevelConfigurationApi = createAsyncThunk(
  "UpdateGlobalLevelConfigurationApi/UpdateGlobalLevelConfigurationApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { data, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append("RequestMethod", updateGlobalLevelConfiguration.RequestMethod);
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
                "Admin_AdminServiceManager_UpdateGlobalLevelConfiguration_01".toLowerCase()
              )
          ) {
            dispatch(getGlobalLevelConfigurationsApi({ navigate, t }));
            dispatch(globalAdminDashBoardLoader(false));
            try {
              return {
                result: response.data.responseResult,
                code: t("Updated-Successfully"),
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_UpdateGlobalLevelConfiguration_02".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("No record updated");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_UpdateGlobalLevelConfiguration_03".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

// get All Packages Dynamic tabs Main Api
export const getAllPackagesDynamicTabsApi = createAsyncThunk(
  "getAllPackagesDynamicTabsApi/getAllPackagesDynamicTabsApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestMethod", getAllPackages.RequestMethod);
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
                "Admin_AdminServiceManager_GetAllPackageNames_01".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            try {
              return {
                result: response.data.responseResult,
                code: "GetAllPackageNames_01",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetAllPackageNames_02".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetAllPackageNames_03".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

// get listOfPackageLisencesMainApi Main Api
export const listOfPackageLisencesMainApi = createAsyncThunk(
  "listOfPackageLisencesMainApi/listOfPackageLisencesMainApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { newData, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(newData));
    form.append("RequestMethod", listOfPackageLisences.RequestMethod);
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
                "Admin_AdminServiceManager_ListOfAllTheActiveOrganizationPackageLisences_01".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            try {
              return {
                result: response.data.responseResult,
                code: "ListOfAllTheActiveOrganizationPackageLisences_01",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_ListOfAllTheActiveOrganizationPackageLisences_02".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_ListOfAllTheActiveOrganizationPackageLisences_02".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

// get All Organizations Names Main Api
export const getAllOrganizationNameMainApi = createAsyncThunk(
  "getAllOrganizationNameMainApi/getAllOrganizationNameMainApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { newData, navigate, t } = requestData;
    let form = new FormData();
    // form.append("RequestData", JSON.stringify(newData));
    form.append("RequestMethod", getAllOrganizationNamesApi.RequestMethod);
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
                "Admin_AdminServiceManager_GetAllOrganizationNames_01".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            try {
              return {
                result: response.data.responseResult,
                code: "GetAllOrganizationNames_01",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetAllOrganizationNames_02".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetAllOrganizationNames_03".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

// for download dynamically Report Main Api
export const dynamicalyDownloadReportApi = createAsyncThunk(
  "dynamicalyDownloadReportApi/dynamicalyDownloadReportApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    try {
      let token = localStorage.getItem("token");
      let { data } = requestData;
      let form = new FormData();
      form.append(
        "RequestMethod",
        dynamicallyReportOfActivePackageLicensesApi.RequestMethod
      );
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
        link.setAttribute("download", "download-Dynamically-reports.xlsx");
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

// download main Invoice API
export const downloadInvoiceReportMainApi = createAsyncThunk(
  "downloadInvoiceReportMainApi/downloadInvoiceReportMainApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    try {
      let token = localStorage.getItem("token");
      console.log(token, "responseresponseresponseresponse");

      let { data, navigate, t } = requestData;
      console.log(data, "responseresponseresponseresponse");

      let form = new FormData();
      console.log(form, "responseresponseresponseresponse");

      form.append("RequestData", JSON.stringify(data));

      form.append("RequestMethod", downloadInvoiceApi.RequestMethod);

      console.log(form, "responseresponseresponseresponse");
      let response;
      let contentType = "application/pdf";
      try {
        response = await axios({
          method: "post",
          url: adminURL,
          data: form,
          headers: {
            _token: token,
            "Content-Disposition": "attachment; filename=template.pdf",
            "Content-Type": contentType,
          },
          responseType: "blob",
        });
      } catch (error) {
        console.log(error, "responseresponseresponseresponse");
      }

      console.log(response, "responseresponseresponseresponse");
      if (response.status === 200) {
        // Create a temporary URL for the blob data
        const url = window.URL.createObjectURL(new Blob([response.data]));
        // Create a link element and simulate a click to trigger the download
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "download-Invoice.pdf");
        document.body.appendChild(link);
        link.click();
        // Dispatch action to update loading state or handle other logic
        dispatch(globalAdminDashBoardLoader(false));
      } else {
        // Handle other status codes if needed
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue("Error downloading file");
      }
    } catch (error) {
      // Handle errors
      dispatch(globalAdminDashBoardLoader(false));
      return rejectWithValue(error);
    }
  }
);

// get All User Info Main Api
export const getUserInfoMainApi = createAsyncThunk(
  "getUserInfoMainApi/getUserInfoMainApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { newData, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestMethod", getUserInfoApi.RequestMethod);
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
                "ERM_AuthService_AuthManager_GetUserMobileAndCode_01".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            try {
              return {
                result: response.data.responseResult,
                code: "GetUserMobileAndCode_01",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_GetUserMobileAndCode_02".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_GetUserMobileAndCode_03".toLowerCase()
              )
          ) {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);
