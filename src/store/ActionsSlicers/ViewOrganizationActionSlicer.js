import { createSlice } from "@reduxjs/toolkit";
import {
  EditOrganizationAPI,
  EditSubscriptionAPI,
  getAllOrganizationApi,
  searchOrganizationApi,
} from "../Actions/ViewOrganizationActions";

const initialState = {
  loading: false,
  searchOrganizationData: null,
  editSubscriptionData: null,
  editOrganizationData: null,
  getAllOrganizationData: [],
  Responsemessage: "",
};

const searchOrganization = createSlice({
  name: "searchOrganization",
  initialState,
  reducers: {
    viewOrganizationLoader: (state, { payload }) => {
      state.loading = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchOrganizationApi.pending, (state) => {
        // state.loading = true;
      })
      .addCase(searchOrganizationApi.fulfilled, (state, action) => {
        state.searchOrganizationData = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(searchOrganizationApi.rejected, (state, action) => {
        state.searchOrganizationData = null;
        state.Responsemessage = action.payload || "An error occurred";
      })

      .addCase(EditSubscriptionAPI.pending, (state) => {
        // state.loading = true;
      })

      .addCase(EditSubscriptionAPI.fulfilled, (state, action) => {
        state.Responsemessage = action.payload.code || "An error occurred";
        state.editSubscriptionData = action.payload;
      })

      .addCase(EditSubscriptionAPI.rejected, (state, action) => {
        state.editSubscriptionData = null;
        state.Responsemessage = action.payload || "An error occurred";
      })

      .addCase(EditOrganizationAPI.pending, (state) => {
        // state.loading = true;
      })

      .addCase(EditOrganizationAPI.fulfilled, (state, action) => {
        console.log("addPackageFeatureApiaddPackageFeatureApi", action);

        state.Responsemessage = action.payload.code || "An error occurred";
        state.editOrganizationData = action.payload;
      })

      .addCase(EditOrganizationAPI.rejected, (state, action) => {
        state.editOrganizationData = null;
        state.Responsemessage = action.payload || "An error occurred";
      })

      .addCase(getAllOrganizationApi.pending, (state) => {})
      .addCase(getAllOrganizationApi.fulfilled, (state, action) => {
        state.getAllOrganizationData = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(getAllOrganizationApi.rejected, (state, action) => {
        state.getAllOrganizationData = [];
        state.Responsemessage = action.payload || "An error occurred";
      });
  },
});

export const { viewOrganizationLoader } = searchOrganization.actions;
export default searchOrganization.reducer;
