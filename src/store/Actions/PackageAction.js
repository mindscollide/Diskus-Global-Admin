import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  adminURL,
  authenticationURL,
  excelURL,
} from "../../common/apis/Api_endPoints";
import {
  getAllPackageFeature,
  deleteMainPackage,
  addUpdatePackagesApi,
  deletePackageFeature,
  getPackageFeature,
  addPackageFeature,
  createPackageFeatures,
} from "../../common/apis/Api_Config";
import { globalAdminDashBoardLoader } from "../ActionsSlicers/GlobalAdminDasboardSlicer";
import { packageAdminLoader } from "../ActionsSlicers/PackageSlicer";
import {
  deletePackageOpenModal,
  packageCreateOpenModal,
} from "../ActionsSlicers/UIModalsActions";

//get All Packagess API for package page
export const getAllPackageApi = createAsyncThunk(
  "getAllPackageApi/getAllPackageApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { data, navigate, t } = requestData;
    let form = new FormData();
    // form.append("RequestData", JSON.stringify(data));
    form.append("RequestMethod", getAllPackageFeature.RequestMethod);
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
            // dispatch(packageAdminLoader(false));
            dispatch(globalAdminDashBoardLoader(false));

            try {
              return {
                result: response.data.responseResult,
                code: "GetAllPackagesWithFeaturesGlobalAdmin",
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
            // dispatch(packageAdminLoader(false));
            dispatch(globalAdminDashBoardLoader(false));

            return rejectWithValue("");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetAllPackagesWithFeaturesGlobalAdmin_03".toLowerCase()
              )
          ) {
            // dispatch(packageAdminLoader(false));
            dispatch(globalAdminDashBoardLoader(false));

            return rejectWithValue(t("Something-went-wrong"));
          } else {
            // dispatch(packageAdminLoader(false));
            dispatch(globalAdminDashBoardLoader(false));

            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          //   dispatch(packageAdminLoader(false));
          dispatch(globalAdminDashBoardLoader(false));

          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        // dispatch(packageAdminLoader(false));
        dispatch(globalAdminDashBoardLoader(false));

        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

//get All Packagess API for package page
export const deleteMainPackageApi = createAsyncThunk(
  "deleteMainPackageApi/deleteMainPackageApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { data, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append("RequestMethod", deleteMainPackage.RequestMethod);
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
                "Admin_AdminServiceManager_DeletePackage_01".toLowerCase()
              )
          ) {
            // dispatch(packageAdminLoader(false));
            dispatch(getAllPackageApi({ navigate, t }));
            dispatch(globalAdminDashBoardLoader(false));
            dispatch(deletePackageOpenModal(false));
            try {
              return {
                result: response.data.responseResult,
                code: "DeletePackage_01",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_DeletePackage_02".toLowerCase()
              )
          ) {
            // dispatch(packageAdminLoader(false));
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("Failed to Delete Package");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_DeletePackage_03".toLowerCase()
              )
          ) {
            // dispatch(packageAdminLoader(false));
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            // dispatch(packageAdminLoader(false));
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          //   dispatch(packageAdminLoader(false));
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        // dispatch(packageAdminLoader(false));
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

//get Add Create Pacakeg API for package Main page
export const addUpdatePackagesMainApi = createAsyncThunk(
  "addUpdatePackagesMainApi/addUpdatePackagesMainApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { data, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append("RequestMethod", addUpdatePackagesApi.RequestMethod);
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
                "Admin_AdminServiceManager_AddUpdatePackage_01".toLowerCase()
              )
          ) {
            // dispatch(packageAdminLoader(false));
            dispatch(getAllPackageApi({ navigate, t }));
            dispatch(globalAdminDashBoardLoader(false));
            try {
              return {
                result: response.data.responseResult,
                code: t("Package-created-successfully"),
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_AddUpdatePackage_02".toLowerCase()
              )
          ) {
            // dispatch(packageAdminLoader(false));
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("Failed to Create Package");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_AddUpdatePackage_03".toLowerCase()
              )
          ) {
            // dispatch(packageAdminLoader(false));
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("Package Updated Successfully");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_AddUpdatePackage_04".toLowerCase()
              )
          ) {
            // dispatch(packageAdminLoader(false));
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("Failed to Update Package");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_AddUpdatePackage_05".toLowerCase()
              )
          ) {
            // dispatch(packageAdminLoader(false));
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            // dispatch(packageAdminLoader(false));
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          //   dispatch(packageAdminLoader(false));
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        // dispatch(packageAdminLoader(false));
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

// delete Package Features API for Package Page

export const deletePackageFeatureApi = createAsyncThunk(
  "deletePackageFeatureApi/deletePackageFeatureApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { data, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append("RequestMethod", deletePackageFeature.RequestMethod);
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
                "Admin_AdminServiceManager_DeletePackageFeature_01".toLowerCase()
              )
          ) {
            // dispatch(packageAdminLoader(false));
            dispatch(getPackageFeaturesApi({ navigate, t }));
            dispatch(globalAdminDashBoardLoader(false));
            try {
              return {
                result: response.data.responseResult,
                code: "DeletePackageFeature_01",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_DeletePackageFeature_02".toLowerCase()
              )
          ) {
            // dispatch(packageAdminLoader(false));
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue("Failed to Delete Package Feature");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_DeletePackageFeature_03".toLowerCase()
              )
          ) {
            // dispatch(packageAdminLoader(false));
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            // dispatch(packageAdminLoader(false));
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          //   dispatch(packageAdminLoader(false));
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        // dispatch(packageAdminLoader(false));
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

// get Package Features API for Package Page in Dropdown
export const getPackageFeaturesApi = createAsyncThunk(
  "getPackageFeaturesApi/getPackageFeaturesApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { data, navigate, t } = requestData;
    let form = new FormData();
    // form.append("RequestData", JSON.stringify(data));
    form.append("RequestMethod", getPackageFeature.RequestMethod);
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
                "Admin_AdminServiceManager_GetPackageFeature_01".toLowerCase()
              )
          ) {
            // dispatch(packageAdminLoader(false));
            dispatch(globalAdminDashBoardLoader(false));

            try {
              return {
                result: response.data.responseResult,
                code: "GetPackageFeature_01",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetPackageFeature_02".toLowerCase()
              )
          ) {
            // dispatch(packageAdminLoader(false));
            dispatch(globalAdminDashBoardLoader(false));

            return rejectWithValue("");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_GetPackageFeature_03".toLowerCase()
              )
          ) {
            // dispatch(packageAdminLoader(false));
            dispatch(globalAdminDashBoardLoader(false));

            return rejectWithValue(t("Something-went-wrong"));
          } else {
            // dispatch(packageAdminLoader(false));
            dispatch(globalAdminDashBoardLoader(false));

            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          //   dispatch(packageAdminLoader(false));
          dispatch(globalAdminDashBoardLoader(false));

          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        // dispatch(packageAdminLoader(false));
        dispatch(globalAdminDashBoardLoader(false));

        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

//add Package Features API for Package Page from Dropdown
export const addPackageFeatureApi = createAsyncThunk(
  "addPackageFeatureApi/addPackageFeatureApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { data, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append("RequestMethod", addPackageFeature.RequestMethod);
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
                "Admin_AdminServiceManager_AddUpdatePackageFeature_01".toLowerCase()
              )
          ) {
            // dispatch(packageAdminLoader(false));
            dispatch(globalAdminDashBoardLoader(false));
            try {
              return {
                result: response.data.responseResult,
                code: "AddUpdatePackageFeature_01",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_AddUpdatePackageFeature_02".toLowerCase()
              )
          ) {
            // dispatch(packageAdminLoader(false));
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Failed-to-create-package"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_AddUpdatePackageFeature_03".toLowerCase()
              )
          ) {
            // dispatch(packageAdminLoader(false));
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Package-updated-successfully"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_AddUpdatePackageFeature_04".toLowerCase()
              )
          ) {
            // dispatch(packageAdminLoader(false));
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Failed-to-update-package"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_AddUpdatePackageFeature_05".toLowerCase()
              )
          ) {
            // dispatch(packageAdminLoader(false));
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            // dispatch(packageAdminLoader(false));
            dispatch(globalAdminDashBoardLoader(false));
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          //   dispatch(packageAdminLoader(false));
          dispatch(globalAdminDashBoardLoader(false));
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        // dispatch(packageAdminLoader(false));
        dispatch(globalAdminDashBoardLoader(false));
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

// for create Package Feature Mapping

export const createPackageFeaturesApi = createAsyncThunk(
  "createPackageFeaturesApi/createPackageFeaturesApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { data, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append("RequestMethod", createPackageFeatures.RequestMethod);
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
                "Admin_AdminServiceManager_CreatePackageFeatureMapping_01".toLowerCase()
              )
          ) {
            // dispatch(packageAdminLoader(false));
            dispatch(globalAdminDashBoardLoader(false));

            try {
              return {
                result: response.data.responseResult,
                code: "CreatePackageFeatureMapping_01",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_CreatePackageFeatureMapping_02".toLowerCase()
              )
          ) {
            // dispatch(packageAdminLoader(false));
            dispatch(globalAdminDashBoardLoader(false));

            return rejectWithValue(t("Failed-to-create-mapping"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "Admin_AdminServiceManager_CreatePackageFeatureMapping_03".toLowerCase()
              )
          ) {
            // dispatch(packageAdminLoader(false));
            dispatch(globalAdminDashBoardLoader(false));

            return rejectWithValue(t("Something-went-wrong"));
          } else {
            // dispatch(packageAdminLoader(false));
            dispatch(globalAdminDashBoardLoader(false));

            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          //   dispatch(packageAdminLoader(false));
          dispatch(globalAdminDashBoardLoader(false));

          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        // dispatch(packageAdminLoader(false));
        dispatch(globalAdminDashBoardLoader(false));

        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);
