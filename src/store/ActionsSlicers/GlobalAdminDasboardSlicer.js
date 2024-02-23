import { createSlice } from "@reduxjs/toolkit";
import {
  GetAllBillingDueApi,
  OrganizationsByActiveLicenseApi,
  StatsOfActiveLicenseApi,
  TotalThisMonthDueApi,
} from "../Actions/GlobalAdminDashboardActions";

const initialState = {
  loading: false,
  StatsOfActiveLicenseApiData: null,
  OrganizationsByActiveLicenseApiData: null,
  TotalThisMonthDueApiData: null,
  GetAllBillingDueApiData: [],
  Responsemessage: "",
};

const globalAdminDashboardReducer = createSlice({
  name: "globalAdminDashboardReducer",
  initialState,
  reducers: {
    globalAdminDashBoardLoader: (state, { payload }) => {
      state.loading = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //StatsOfActiveLicenseApi Cases
      .addCase(StatsOfActiveLicenseApi.pending, (state) => {
        // state.loading = true;
      })
      .addCase(StatsOfActiveLicenseApi.fulfilled, (state, action) => {
        state.StatsOfActiveLicenseApiData = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(StatsOfActiveLicenseApi.rejected, (state, action) => {
        state.StatsOfActiveLicenseApiData = null;
        state.Responsemessage = action.payload || "An error occurred";
      })

      //OrganizationsByActiveLicenseApi Cases
      .addCase(OrganizationsByActiveLicenseApi.pending, (state) => {
        // state.loading = true;
      })
      .addCase(OrganizationsByActiveLicenseApi.fulfilled, (state, action) => {
        state.OrganizationsByActiveLicenseApiData = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(OrganizationsByActiveLicenseApi.rejected, (state, action) => {
        state.OrganizationsByActiveLicenseApiData = null;
        state.Responsemessage = action.payload || "An error occurred";
      })

      //GetAllBillingDue  Cases
      .addCase(GetAllBillingDueApi.pending, (state) => {
        // state.loading = true;
      })
      .addCase(GetAllBillingDueApi.fulfilled, (state, action) => {
        state.GetAllBillingDueApiData = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(GetAllBillingDueApi.rejected, (state, action) => {
        state.GetAllBillingDueApiData = [];
        state.Responsemessage = action.payload || "An error occurred";
      })

      //TotalThisMonthDue  Cases

      .addCase(TotalThisMonthDueApi.pending, (state) => {
        // state.loading = true;
      })
      .addCase(TotalThisMonthDueApi.fulfilled, (state, action) => {
        state.TotalThisMonthDueApiData = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(TotalThisMonthDueApi.rejected, (state, action) => {
        state.TotalThisMonthDueApiData = null;
        state.Responsemessage = action.payload || "An error occurred";
      });
  },
});

export const { globalAdminDashBoardLoader } =
  globalAdminDashboardReducer.actions;
export default globalAdminDashboardReducer.reducer;
