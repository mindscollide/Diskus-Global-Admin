import { createSlice } from "@reduxjs/toolkit";
import {
  GetAllBillingDueApi,
  OrganizationsByActiveLicenseApi,
  StatsOfActiveLicenseApi,
  TotalThisMonthDueApi,
  dashBoardReportApi,
  organziationStatsBySubscriptionApi,
  OrganizationSubscriptionTypeApi,
} from "../Actions/GlobalAdminDashboardActions";

const initialState = {
  loading: false,
  StatsOfActiveLicenseApiData: null,
  OrganizationsByActiveLicenseApiData: null,
  TotalThisMonthDueApiData: null,
  GetAllBillingDueApiData: [],
  OrganizationStatsSubscriptionData: null,
  OrganizationSubscriptionStatsGraphData: null,
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

      //OrganizationStatsSubscriptionApi cases
      .addCase(organziationStatsBySubscriptionApi.pending, (state) => {
        // state.loading = true;
      })
      .addCase(
        organziationStatsBySubscriptionApi.fulfilled,
        (state, action) => {
          state.OrganizationStatsSubscriptionData = action.payload;
          state.Responsemessage = "Success";
        }
      )
      .addCase(organziationStatsBySubscriptionApi.rejected, (state, action) => {
        state.OrganizationStatsSubscriptionData = null;
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
      })

      //Billing Due Report
      .addCase(dashBoardReportApi.pending, (state) => {
        // state.loading = true;
      })

      .addCase(dashBoardReportApi.fulfilled, (state, action) => {
        state.Responsemessage = "Success";
      })

      .addCase(dashBoardReportApi.rejected, (state, action) => {
        state.Responsemessage = action.payload || "An error occurred";
      })

      //Global Admin Dashboard Organization Stats Graph Table Data Reducer
      .addCase(OrganizationSubscriptionTypeApi.pending, (state) => {
        // state.loading = true;
      })
      .addCase(OrganizationSubscriptionTypeApi.fulfilled, (state, action) => {
        state.OrganizationSubscriptionStatsGraphData = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(OrganizationSubscriptionTypeApi.rejected, (state, action) => {
        state.OrganizationSubscriptionStatsGraphData = null;
        state.Responsemessage = action.payload || "An error occurred";
      });
  },
});

export const { globalAdminDashBoardLoader } =
  globalAdminDashboardReducer.actions;
export default globalAdminDashboardReducer.reducer;
