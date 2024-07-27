import { createSlice } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";
import {
  getAllPackageApi,
  deleteMainPackageApi,
  addUpdatePackagesMainApi,
  deletePackageFeatureApi,
  getPackageFeaturesApi,
  addPackageFeatureApi,
  createPackageFeaturesApi,
} from "../Actions/PackageAction";

const initialState = {
  loading: false,
  ResponseMessage: "",
  packagesFeaturesGlobalData: null,
  deleteMainPackageData: null,
  addCreatePackageData: null,
  deletePackageFeatureData: null,
  getPackageFeatureData: null,
  addPackageFeaturesData: null,
  createPackageData: null,
};

const packageAdminReducer = createSlice({
  name: "packageAdminReducer",
  initialState,
  reducers: {
    packageAdminLoader: (state, { payload }) => {
      state.loading = payload;
    },
    resetResponseMessage: (state, { payload }) => {
      state.ResponseMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      //getAllPackageApi Cases
      .addCase(getAllPackageApi.pending, (state) => {
        // state.loading = true;
      })
      .addCase(getAllPackageApi.fulfilled, (state, action) => {
        state.packagesFeaturesGlobalData = action.payload;
        state.ResponseMessage = "Success";
      })
      .addCase(getAllPackageApi.rejected, (state, action) => {
        state.packagesFeaturesGlobalData = null;
        state.ResponseMessage = action.payload || "An error occurred";
      })

      // delete Main Package Api
      .addCase(deleteMainPackageApi.pending, (state) => {
        // state.loading = true;
      })
      .addCase(deleteMainPackageApi.fulfilled, (state, action) => {
        state.deleteMainPackageData = action.payload;
        state.ResponseMessage = "Success";
      })
      .addCase(deleteMainPackageApi.rejected, (state, action) => {
        state.deleteMainPackageData = null;
        state.ResponseMessage = action.payload || "An error occurred";
      })

      // Add Create Main Package Api
      .addCase(addUpdatePackagesMainApi.pending, (state) => {
        // state.loading = true;
      })
      .addCase(addUpdatePackagesMainApi.fulfilled, (state, action) => {
        console.log("addPackageFeatureApiaddPackageFeatureApi", action);

        state.ResponseMessage = action.payload.code || "An error occurred";
        state.addCreatePackageData = action.payload;
      })
      .addCase(addUpdatePackagesMainApi.rejected, (state, action) => {
        state.addCreatePackageData = null;
        state.ResponseMessage = action.payload || "An error occurred";
      })

      // delete Package Feature Api
      .addCase(deletePackageFeatureApi.pending, (state) => {
        // state.loading = true;
      })
      .addCase(deletePackageFeatureApi.fulfilled, (state, action) => {
        state.deletePackageFeatureData = action.payload;
        state.ResponseMessage = "Success";
      })
      .addCase(deletePackageFeatureApi.rejected, (state, action) => {
        state.deletePackageFeatureData = null;
        state.ResponseMessage = action.payload || "An error occurred";
      })

      //getPackageFeatureApi Cases
      .addCase(getPackageFeaturesApi.pending, (state) => {
        // state.loading = true;
      })
      .addCase(getPackageFeaturesApi.fulfilled, (state, action) => {
        state.getPackageFeatureData = action.payload;
        state.ResponseMessage = "Success";
      })
      .addCase(getPackageFeaturesApi.rejected, (state, action) => {
        state.getPackageFeatureData = null;
        state.ResponseMessage = action.payload || "An error occurred";
      })

      // Add Package Features from Dropdown Main Api
      .addCase(addPackageFeatureApi.pending, (state) => {
        // state.loading = true;
      })
      .addCase(addPackageFeatureApi.fulfilled, (state, action) => {
        state.addPackageFeaturesData = action.payload;
        state.ResponseMessage = "Success";
      })
      .addCase(addPackageFeatureApi.rejected, (state, action) => {
        state.addPackageFeaturesData = null;
        state.ResponseMessage = action.payload || "An error occurred";
      })

      // Create Package Features Mapping Main Api
      .addCase(createPackageFeaturesApi.pending, (state) => {
        // state.loading = true;
      })
      .addCase(createPackageFeaturesApi.fulfilled, (state, action) => {
        state.createPackageData = action.payload;
        state.ResponseMessage = "Success";
      })
      .addCase(createPackageFeaturesApi.rejected, (state, action) => {
        state.createPackageData = null;
        state.ResponseMessage = action.payload || "An error occurred";
      });
  },
});

export const { packageAdminLoader, resetResponseMessage } =
  packageAdminReducer.actions;
export default packageAdminReducer.reducer;
