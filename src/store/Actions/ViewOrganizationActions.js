import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  UpdateOrganizationTrialRequestRM,
  ValidateEncryptedStringForOrganizationTrialEmailRM,
  editOrganization,
  editSubscription,
  getAllOrganization,
  searchAllTrailRejectedOrganizationsRM,
  searchAllTrialRequestedOrganizationsRM,
  searchOrganization,
} from "../../common/apis/Api_Config";
import { adminURL } from "../../common/apis/Api_endPoints";
import {
  confirmatioModalFunc,
  viewOrganizationLoader,
} from "../ActionsSlicers/ViewOrganizationActionSlicer";

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
            return rejectWithValue("");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_SearchOrganization_03".toLowerCase()
              )
          ) {
            dispatch(viewOrganizationLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(viewOrganizationLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(viewOrganizationLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(viewOrganizationLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

//Edit subscription API
export const EditSubscriptionAPI = createAsyncThunk(
  "Subscription/editSubscrtiption",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    console.log(requestData, "requestDatarequestData");
    let { data, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append("RequestMethod", editSubscription.RequestMethod);

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
                "Admin_AdminServiceManager_UpdateOrganizationSubscriptionStatus_01".toLowerCase()
              )
          ) {
            let newData = {
              OrganizationContactName: "",
              OrganizationContactEmail: "",
              OrganizationDateTo: "",
              OrganizationDateFrom: "",
              OrganizationSubscriptionStatus: 0,
              OrganizationName: "",
              sRow: 0,
              eRow: 10,
            };
            dispatch(viewOrganizationLoader(true));
            dispatch(getAllOrganizationApi({ newData, navigate, t }));
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
                "Admin_AdminServiceManager_UpdateOrganizationSubscriptionStatus_02".toLowerCase()
              )
          ) {
            dispatch(viewOrganizationLoader(false));
            return rejectWithValue("No data was updated");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_UpdateOrganizationSubscriptionStatus_03".toLowerCase()
              )
          ) {
            dispatch(viewOrganizationLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(viewOrganizationLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(viewOrganizationLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(viewOrganizationLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

//Edit Organization
export const EditOrganizationAPI = createAsyncThunk(
  "organization/editOrganization",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    console.log(requestData, "requestDatarequestData");
    let { data, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append("RequestMethod", editOrganization.RequestMethod);

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
                "Admin_AdminServiceManager_UpdateOrganizationStatus_01".toLowerCase()
              )
          ) {
            let newData = {
              OrganizationContactName: "",
              OrganizationContactEmail: "",
              OrganizationDateTo: "",
              OrganizationDateFrom: "",
              OrganizationSubscriptionStatus: 0,
              OrganizationName: "",
              sRow: 0,
              eRow: 10,
            };
            dispatch(viewOrganizationLoader(true));
            dispatch(getAllOrganizationApi({ newData, navigate, t }));
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
                "Admin_AdminServiceManager_UpdateOrganizationStatus_02".toLowerCase()
              )
          ) {
            dispatch(viewOrganizationLoader(false));
            return rejectWithValue("No data was updated");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_UpdateOrganizationStatus_03".toLowerCase()
              )
          ) {
            dispatch(viewOrganizationLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(viewOrganizationLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(viewOrganizationLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(viewOrganizationLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

// for get All Organization API

export const getAllOrganizationApi = createAsyncThunk(
  "getAllOrganization/getAllOrganization",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { newData, navigate, t, setIsFound } = requestData;
    let form = new FormData();
    form.append("RequestMethod", getAllOrganization.RequestMethod);
    form.append("RequestData", JSON.stringify(newData));
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
            if (
              typeof setIsFound === "function" &&
              response.data.responseResult.getAllOrganizations.length === 0
            ) {
              setIsFound(false);
            }

            dispatch(viewOrganizationLoader(false));
            return rejectWithValue("");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetAllOrganization_03".toLowerCase()
              )
          ) {
            dispatch(viewOrganizationLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(viewOrganizationLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(viewOrganizationLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(viewOrganizationLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      dispatch(viewOrganizationLoader(false));

      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

// for get All Trail Rejected API

export const getAllTrailRejectedApi = createAsyncThunk(
  "Organization/getAllTrailRejectedApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { newData, navigate, t } = requestData;
    let form = new FormData();
    form.append(
      "RequestMethod",
      searchAllTrailRejectedOrganizationsRM.RequestMethod
    );
    form.append("RequestData", JSON.stringify(newData));
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
                "Admin_AdminServiceManager_SearchAllTrialRejectedOrganizations_01".toLowerCase()
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
                "Admin_AdminServiceManager_SearchAllTrialRejectedOrganizations_02".toLowerCase()
              )
          ) {
            dispatch(viewOrganizationLoader(false));
            return rejectWithValue("");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_SearchAllTrialRejectedOrganizations_03".toLowerCase()
              )
          ) {
            dispatch(viewOrganizationLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(viewOrganizationLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(viewOrganizationLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(viewOrganizationLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      dispatch(viewOrganizationLoader(false));

      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

// for get All Trail Requested API

export const getAllTrailRequestedApi = createAsyncThunk(
  "getAllTrailRequestedApi/getAllTrailRequestedApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { newData, navigate, t } = requestData;
    let form = new FormData();
    form.append(
      "RequestMethod",
      searchAllTrialRequestedOrganizationsRM.RequestMethod
    );
    form.append("RequestData", JSON.stringify(newData));
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
                "Admin_AdminServiceManager_SearchAllTrialRequestedOrganizations_01".toLowerCase()
              )
          ) {
            dispatch(viewOrganizationLoader(false));
            try {
              return {
                result: response.data.responseResult,
                code: "SearchAllTrialRequestedOrganizations_01",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_SearchAllTrialRequestedOrganizations_02".toLowerCase()
              )
          ) {
            dispatch(viewOrganizationLoader(false));
            return rejectWithValue("");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_SearchAllTrialRequestedOrganizations_03".toLowerCase()
              )
          ) {
            dispatch(viewOrganizationLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(viewOrganizationLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(viewOrganizationLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(viewOrganizationLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      dispatch(viewOrganizationLoader(false));

      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

// for get All Trail Requested API

export const updateOrganizationTrailRequestStatusApi = createAsyncThunk(
  "Organization/updateOrganizationTrailRequestStatusApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    console.log(requestData, "requestDatarequestData");
    let token = localStorage.getItem("token");
    let { Data, navigate, t, setStatus, setCurrentTab } = requestData;
    let form = new FormData();
    form.append(
      "RequestMethod",
      UpdateOrganizationTrialRequestRM.RequestMethod
    );
    form.append("RequestData", JSON.stringify(Data));
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
                "Admin_AdminServiceManager_UpdateOrganizationTrialRequestStatus_01".toLowerCase()
              )
          ) {
            if (typeof setCurrentTab === "function") {
              let tab = Data.IsAccepted === true ? 1 : 3;
              setCurrentTab(tab);
            }
            if (typeof setStatus === "function") {
              setStatus("");
            }
            dispatch(viewOrganizationLoader(false));
            dispatch(confirmatioModalFunc(false));
            // if (currentTab) {
            //   if (currentTab === 2) {
            //     let newData = {
            //       OrganizationName: "",
            //       ContactPersonName: "",
            //       ContactPersonEmail: "",
            //       DateTimeTo: "",
            //       DateTimeFrom: "",
            //       SkipRows: 0,
            //       Length: 10,
            //     };
            //     dispatch(viewOrganizationLoader(true));
            //     dispatch(getAllTrailRequestedApi({ newData, navigate, t }));
            //   } else if (currentTab === 3) {
            //     let newData = {
            //       OrganizationName: "",
            //       ContactPersonName: "",
            //       ContactPersonEmail: "",
            //       DateTimeTo: "",
            //       DateTimeFrom: "",
            //       SkipRows: 0,
            //       Length: 10,
            //     };
            //     dispatch(viewOrganizationLoader(true));
            //     dispatch(getAllTrailRejectedApi({ newData, navigate, t }));
            //   }
            // }
            try {
              return {
                result: response.data.responseResult,
                code: "UpdateOrganizationTrialRequestStatus_01",
                message: t("Successfully-updated"),
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_UpdateOrganizationTrialRequestStatus_02".toLowerCase()
              )
          ) {
            dispatch(viewOrganizationLoader(false));
            return rejectWithValue(t("No-record-updated"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_UpdateOrganizationTrialRequestStatus_03".toLowerCase()
              )
          ) {
            dispatch(viewOrganizationLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            dispatch(viewOrganizationLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          dispatch(viewOrganizationLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        dispatch(viewOrganizationLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      dispatch(viewOrganizationLoader(false));

      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

export const validateEncryptedStringForOrganizationTrialEmailApi =
  createAsyncThunk(
    "Organization/validateEncryptedStringForOrganizationTrialEmailApi",
    async (requestData, { rejectWithValue, dispatch }) => {
      console.log(requestData, "requestDatarequestData");
      let token = localStorage.getItem("token");
      let { Data, navigate, t, setCurrentTab } = requestData;
      let form = new FormData();
      form.append(
        "RequestMethod",
        ValidateEncryptedStringForOrganizationTrialEmailRM.RequestMethod
      );
      form.append("RequestData", JSON.stringify(Data));
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
                  "Admin_AdminServiceManager_ValidateEncryptedStringForOrganizationTrialEmail_01".toLowerCase()
                )
            ) {
              localStorage.removeItem("orgTrialAccept_action");
              localStorage.removeItem("orgTrialReject_action");
              let Data = {
                OrganizationID:
                  response.data.responseResult.data.organizationID,
                IsAccepted: response.data.responseResult.data.isAccepted,
              };
              dispatch(
                updateOrganizationTrailRequestStatusApi({
                  Data,
                  t,
                  navigate,
                  setCurrentTab,
                })
              );
              try {
                return {
                  result: response.data.responseResult,
                  code: "UpdateOrganizationTrialRequestStatus_01",
                  message: t("Successfully-updated"),
                };
              } catch (error) {
                console.log(error);
              }
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "Admin_AdminServiceManager_ValidateEncryptedStringForOrganizationTrialEmail_02".toLowerCase()
                )
            ) {
              localStorage.removeItem("orgTrialAccept_action");
              localStorage.removeItem("orgTrialReject_action");
              dispatch(viewOrganizationLoader(false));
              return rejectWithValue(t("No-record-updated"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "Admin_AdminServiceManager_ValidateEncryptedStringForOrganizationTrialEmail_03".toLowerCase()
                )
            ) {
              localStorage.removeItem("orgTrialAccept_action");
              localStorage.removeItem("orgTrialReject_action");
              dispatch(viewOrganizationLoader(false));
              return rejectWithValue(t("Something-went-wrong"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "Admin_AdminServiceManager_ValidateEncryptedStringForOrganizationTrialEmail_04".toLowerCase()
                )
            ) {
              localStorage.removeItem("orgTrialAccept_action");
              localStorage.removeItem("orgTrialReject_action");
              dispatch(viewOrganizationLoader(false));
              return rejectWithValue(t("Something-went-wrong"));
            } else {
              localStorage.removeItem("orgTrialAccept_action");
              localStorage.removeItem("orgTrialReject_action");
              dispatch(viewOrganizationLoader(false));
              return rejectWithValue(t("Something-went-wrong"));
            }
          } else {
            localStorage.removeItem("orgTrialAccept_action");
            localStorage.removeItem("orgTrialReject_action");
            dispatch(viewOrganizationLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          localStorage.removeItem("orgTrialAccept_action");
          localStorage.removeItem("orgTrialReject_action");
          dispatch(viewOrganizationLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } catch (error) {
        localStorage.removeItem("orgTrialAccept_action");
        localStorage.removeItem("orgTrialReject_action");
        dispatch(viewOrganizationLoader(false));

        return rejectWithValue(t("Something-went-wrong"));
      }
    }
  );
