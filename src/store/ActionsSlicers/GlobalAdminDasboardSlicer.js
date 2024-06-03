import { createSlice } from "@reduxjs/toolkit";
import {
  GetAllBillingDueApi,
  OrganizationsByActiveLicenseApi,
  StatsOfActiveLicenseApi,
  TotalThisMonthDueApi,
  dashBoardReportApi,
  organziationStatsBySubscriptionApi,
  OrganizationSubscriptionTypeApi,
  SendInvoiceApi,
  GetAllPackagesWithFeaturesGlobalAdminApi,
  UpdatePackagePriceGlobalAdminApi,
  GetSystemConfigurationsApi,
  UpdateAllOrganizationLevelConfigurationApi,
  ChangePasswordApi,
  getCashFlowMainApi,
  getCashOutStandingFlowMainApi,
  getListTrialSubscription,
  getListOfExtendedTrailSubscriptions,
  getListOfSubscribedSubscriptions,
  getListOfExpiredSubscriptions,
  trialRenewApi,
  trialSubscribeReportApi,
  trialExtendedReportApi,
  trialSubscribeExpiredReportApi,
  getPackageDetailGlobalApi,
} from "../Actions/GlobalAdminDashboardActions";

const initialState = {
  loading: false,
  StatsOfActiveLicenseApiData: null,
  OrganizationsByActiveLicenseApiData: null,
  TotalThisMonthDueApiData: null,
  GetAllBillingDueApiData: [],
  OrganizationStatsSubscriptionData: null,
  OrganizationSubscriptionStatsGraphData: null,
  SendInvoiceData: null,
  GetAllPackagesWithFeaturesGlobalAdminData: [],
  UpdatePackagePriceGlobalAdminData: null,
  GetSystemConfigurationsData: [],
  UpdateAllOrganizationLevelConfigurationData: null,
  changePasswordData: null,
  cashFlowData: null,
  cashOutFlowData: null,
  listOfTrialSubscription: null,
  listOfTrialExtendedSubscription: null,
  listofTrialSubscribeSubscription: null,
  listOfExpiredSubscriptions: null,
  trialRenew: null,
  packageDetailModalData: null,
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
      })

      //Send Invoice APi Reducer Data
      .addCase(SendInvoiceApi.pending, (state) => {
        // state.loading = true;
      })
      .addCase(SendInvoiceApi.fulfilled, (state, action) => {
        state.SendInvoiceData = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(SendInvoiceApi.rejected, (state, action) => {
        state.SendInvoiceData = null;
        state.Responsemessage = action.payload || "An error occurred";
      })

      //GetAllPackagesWithFeaturesGlobalAdminApi APi Reducer Data
      .addCase(GetAllPackagesWithFeaturesGlobalAdminApi.pending, (state) => {
        // state.loading = true;
      })
      .addCase(
        GetAllPackagesWithFeaturesGlobalAdminApi.fulfilled,
        (state, action) => {
          state.GetAllPackagesWithFeaturesGlobalAdminData = action.payload;
          state.Responsemessage = "Success";
        }
      )
      .addCase(
        GetAllPackagesWithFeaturesGlobalAdminApi.rejected,
        (state, action) => {
          state.GetAllPackagesWithFeaturesGlobalAdminData = [];
          state.Responsemessage = action.payload || "An error occurred";
        }
      )
      //UpdatePackagePriceGlobalAdminApi APi Reducer Data
      .addCase(UpdatePackagePriceGlobalAdminApi.pending, (state) => {
        // state.loading = true;
      })
      .addCase(UpdatePackagePriceGlobalAdminApi.fulfilled, (state, action) => {
        state.UpdatePackagePriceGlobalAdminData = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(UpdatePackagePriceGlobalAdminApi.rejected, (state, action) => {
        state.UpdatePackagePriceGlobalAdminData = null;
        state.Responsemessage = action.payload || "An error occurred";
      })

      //GetSystemConfigurations APi Reducer Data
      .addCase(GetSystemConfigurationsApi.pending, (state) => {
        // state.loading = true;
      })
      .addCase(GetSystemConfigurationsApi.fulfilled, (state, action) => {
        state.GetSystemConfigurationsData = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(GetSystemConfigurationsApi.rejected, (state, action) => {
        state.GetSystemConfigurationsData = [];
        state.Responsemessage = action.payload || "An error occurred";
      })

      //UpdateAllOrganizationLevelConfiguration APi Reducer Data
      .addCase(UpdateAllOrganizationLevelConfigurationApi.pending, (state) => {
        // state.loading = true;
      })
      .addCase(
        UpdateAllOrganizationLevelConfigurationApi.fulfilled,
        (state, action) => {
          state.UpdateAllOrganizationLevelConfigurationData = action.payload;
          state.Responsemessage = "Success";
        }
      )
      .addCase(
        UpdateAllOrganizationLevelConfigurationApi.rejected,
        (state, action) => {
          state.UpdateAllOrganizationLevelConfigurationData = null;
          state.Responsemessage = action.payload || "An error occurred";
        }
      )

      //Change Password APi Reducer Data
      .addCase(ChangePasswordApi.pending, (state) => {
        // state.loading = true;
      })
      .addCase(ChangePasswordApi.fulfilled, (state, action) => {
        state.changePasswordData = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(ChangePasswordApi.rejected, (state, action) => {
        state.changePasswordData = null;
        state.Responsemessage = action.payload || "An error occurred";
      })

      //get cash IN Flow Api Reducer Data
      .addCase(getCashFlowMainApi.pending, (state) => {
        // state.loading = true;
      })
      .addCase(getCashFlowMainApi.fulfilled, (state, action) => {
        state.cashFlowData = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(getCashFlowMainApi.rejected, (state, action) => {
        state.cashFlowData = null;
        state.Responsemessage = action.payload || "An error occurred";
      })

      //get cash OUT Flow Api Reducer Data
      .addCase(getCashOutStandingFlowMainApi.pending, (state) => {
        // state.loading = true;
      })
      .addCase(getCashOutStandingFlowMainApi.fulfilled, (state, action) => {
        state.cashOutFlowData = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(getCashOutStandingFlowMainApi.rejected, (state, action) => {
        state.cashOutFlowData = null;
        state.Responsemessage = action.payload || "An error occurred";
      })

      //get List Of Trial Subscription Trial Api Reducer Data
      .addCase(getListTrialSubscription.pending, (state) => {
        // state.loading = true;
      })
      .addCase(getListTrialSubscription.fulfilled, (state, action) => {
        state.listOfTrialSubscription = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(getListTrialSubscription.rejected, (state, action) => {
        state.listOfTrialSubscription = null;
        state.Responsemessage = action.payload || "An error occurred";
      })

      //get List Of Trial Extended Subscription Trial Api Reducer Data
      .addCase(getListOfExtendedTrailSubscriptions.pending, (state) => {
        // state.loading = true;
      })
      .addCase(
        getListOfExtendedTrailSubscriptions.fulfilled,
        (state, action) => {
          state.listOfTrialExtendedSubscription = action.payload;
          state.Responsemessage = "Success";
        }
      )
      .addCase(
        getListOfExtendedTrailSubscriptions.rejected,
        (state, action) => {
          state.listOfTrialExtendedSubscription = null;
          state.Responsemessage = action.payload || "An error occurred";
        }
      )

      //get List of Trial Subscribe Subscription Api Reducer Data
      .addCase(getListOfSubscribedSubscriptions.pending, (state) => {
        // state.loading = true;
      })
      .addCase(getListOfSubscribedSubscriptions.fulfilled, (state, action) => {
        state.listofTrialSubscribeSubscription = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(getListOfSubscribedSubscriptions.rejected, (state, action) => {
        state.listofTrialSubscribeSubscription = null;
        state.Responsemessage = action.payload || "An error occurred";
      })

      //get List of Expired Subscription Api Reducer Data
      .addCase(getListOfExpiredSubscriptions.pending, (state) => {
        // state.loading = true;
      })
      .addCase(getListOfExpiredSubscriptions.fulfilled, (state, action) => {
        state.listOfExpiredSubscriptions = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(getListOfExpiredSubscriptions.rejected, (state, action) => {
        state.listOfExpiredSubscriptions = null;
        state.Responsemessage = action.payload || "An error occurred";
      })

      //Trial Renew Api
      .addCase(trialRenewApi.pending, (state) => {
        // state.loading = true;
      })
      .addCase(trialRenewApi.fulfilled, (state, action) => {
        state.trialRenew = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(trialRenewApi.rejected, (state, action) => {
        state.trialRenew = null;
        state.Responsemessage = action.payload || "An error occurred";
      })

      // Trial Extended Download Report Api
      .addCase(trialExtendedReportApi.pending, (state) => {
        // state.loading = false;
      })
      .addCase(trialExtendedReportApi.fulfilled, (state, action) => {
        state.Responsemessage = "Success";
      })
      .addCase(trialExtendedReportApi.rejected, (state, action) => {
        state.Responsemessage = action.payload || "An error occurred";
      })

      // Trial Subscribe Download Report Api
      .addCase(trialSubscribeReportApi.pending, (state) => {
        // state.loading = false;
      })
      .addCase(trialSubscribeReportApi.fulfilled, (state, action) => {
        state.Responsemessage = "Success";
      })
      .addCase(trialSubscribeReportApi.rejected, (state, action) => {
        state.Responsemessage = action.payload || "An error occurred";
      })

      // Trial Subscription Expired Download Report Api
      .addCase(trialSubscribeExpiredReportApi.pending, (state) => {
        // state.loading = false;
      })
      .addCase(trialSubscribeExpiredReportApi.fulfilled, (state, action) => {
        state.Responsemessage = "Success";
      })
      .addCase(trialSubscribeExpiredReportApi.rejected, (state, action) => {
        state.Responsemessage = action.payload || "An error occurred";
      })

      //get PackageDetail Modal Api
      .addCase(getPackageDetailGlobalApi.pending, (state) => {
        // state.loading = true;
      })
      .addCase(getPackageDetailGlobalApi.fulfilled, (state, action) => {
        state.packageDetailModalData = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(getPackageDetailGlobalApi.rejected, (state, action) => {
        state.packageDetailModalData = null;
        state.Responsemessage = action.payload || "An error occurred";
      });
  },
});

export const { globalAdminDashBoardLoader } =
  globalAdminDashboardReducer.actions;
export default globalAdminDashboardReducer.reducer;
