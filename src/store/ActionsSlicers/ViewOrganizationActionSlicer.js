import { createSlice } from "@reduxjs/toolkit";
import {
  EditOrganizationAPI,
  EditSubscriptionAPI,
  searchOrganizationApi,
} from "../Actions/ViewOrganizationActions";

const initialState = {
  loading: false,
  searchOrganizationData: null,
  editSubscriptionData: null,
  editOrganizationData: null,
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
        state.editSubscriptionData = action.payload;
        state.Responsemessage = "Success";
      })

      .addCase(EditSubscriptionAPI.rejected, (state, action) => {
        state.editSubscriptionData = null;
        state.Responsemessage = action.payload || "An error occurred";
      })

      .addCase(EditOrganizationAPI.pending, (state) => {
        // state.loading = true;
      })

      .addCase(EditOrganizationAPI.fulfilled, (state, action) => {
        state.editOrganizationData = action.payload;
        state.Responsemessage = "Success";
      })

      .addCase(EditOrganizationAPI.rejected, (state, action) => {
        state.editOrganizationData = null;
        state.Responsemessage = action.payload || "An error occurred";
      });
  },
});

export const { viewOrganizationLoader } = searchOrganization.actions;
export default searchOrganization.reducer;
