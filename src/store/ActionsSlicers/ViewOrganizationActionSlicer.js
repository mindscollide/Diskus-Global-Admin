import { createSlice } from "@reduxjs/toolkit";
import {
  searchOrganizationApi,
  getAllOrganizationApi,
} from "../Actions/ViewOrganizationActions";

const initialState = {
  loading: false,
  searchOrganizationData: null,
  getAllOrganizationData: null,
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
        // state.loading = false;
        state.searchOrganizationData = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(searchOrganizationApi.rejected, (state, action) => {
        // state.loading = false;
        state.searchOrganizationData = null;
        state.Responsemessage = action.payload || "An error occurred";
      })
      .addCase(getAllOrganizationApi.pending, (state) => {})
      .addCase(getAllOrganizationApi.fulfilled, (state, action) => {
        state.getAllOrganizationData = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(getAllOrganizationApi.rejected, (state, action) => {
        state.getAllOrganizationData = null;
        state.Responsemessage = action.payload || "An error occurred";
      });
  },
});

export const { viewOrganizationLoader } = searchOrganization.actions;
export default searchOrganization.reducer;
