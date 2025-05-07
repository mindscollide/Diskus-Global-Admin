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
  UpdateGlobalAdminUserApi,
  trialReportExportApi,
  getInvoiceHtmlApi,
  getAllListOrganizationEssentialApi,
  getAllListOrganizationProfessionalApi,
  getAllListOrganizationPremiumApi,
  essentialDownloadExportApi,
  professionalDownloadExportApi,
  premiumDownloadExportApi,
  getGlobalLevelConfigurationsApi,
  UpdateGlobalLevelConfigurationApi,
  getAllPackagesDynamicTabsApi,
  listOfPackageLisencesMainApi,
  getAllOrganizationNameMainApi,
  dynamicalyDownloadReportApi,
  getOrganizationUserAuditListingAPI,
  getOrganizationUserAuditActionsAPI,
  downloadInvoiceReportMainApi,
  getUserInfoMainApi,
} from "../Actions/GlobalAdminDashboardActions";

const initialState = {
  loading: false,
  StatsOfActiveLicenseApiData: null,
  OrganizationsByActiveLicenseApiData: null,
  TotalThisMonthDueApiData: null,
  GetAllBillingDueApiData: null,
  OrganizationStatsSubscriptionData: null,
  OrganizationSubscriptionStatsGraphData: null,
  SendInvoiceData: null,
  GetAllPackagesWithFeaturesGlobalAdminData: [],
  UpdatePackagePriceGlobalAdminData: null,
  GetSystemConfigurationsData: null,
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
  updateGlobalUser: null,
  listOfTrialSubscriptions: null,
  htmlStringData: null,
  getAllListOrganizationEssentialData: null,
  getAllListOrganizationProfessionalData: null,
  getAllListOrganizationPremiumData: null,
  getGlobalLevelConfigData: null,
  UpdateGlobalLevelConfigData: null,
  getPackagesDynamicTabs: null,
  listOfPackageLisencesData: null,
  getOrganizationNames: null,
  downloadDynamicallyReportData: null,
  downloadInvoiceData: null,
  getUserInfoData: null,
  Responsemessage: "",
  getOrganizationAuditListingData: null,
  getAuditActions: null,
};

const globalAdminDashboardReducer = createSlice({
  name: "globalAdminDashboardReducer",
  initialState,
  reducers: {
    globalAdminDashBoardLoader: (state, { payload }) => {
      state.loading = payload;
    },
    resetResponseMessage: (state, { payload }) => {
      state.Responsemessage = "";
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
        state.Responsemessage = action.payload || "";
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
        state.Responsemessage = action.payload || "";
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
        state.Responsemessage = action.payload || "";
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
        state.GetAllBillingDueApiData = null;
        state.Responsemessage = action.payload || "";
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
        state.Responsemessage = action.payload || "";
      })

      //Billing Due Report
      .addCase(dashBoardReportApi.pending, (state) => {
        // state.loading = true;
      })

      .addCase(dashBoardReportApi.fulfilled, (state, action) => {
        state.Responsemessage = "Success";
      })

      .addCase(dashBoardReportApi.rejected, (state, action) => {
        state.Responsemessage = action.payload || "";
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
        state.Responsemessage = action.payload || "";
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
        state.Responsemessage = action.payload || "";
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
          state.Responsemessage = action.payload || "";
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
        state.Responsemessage = action.payload || "";
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
        state.GetSystemConfigurationsData = null;
        state.Responsemessage = action.payload || "";
      })

      //UpdateAllOrganizationLevelConfiguration APi Reducer Data
      .addCase(UpdateAllOrganizationLevelConfigurationApi.pending, (state) => {
        // state.loading = true;
      })
      .addCase(
        UpdateAllOrganizationLevelConfigurationApi.fulfilled,
        (state, action) => {
          state.UpdateAllOrganizationLevelConfigurationData = action.payload;
          state.Responsemessage = action.payload.code || "";
        }
      )
      .addCase(
        UpdateAllOrganizationLevelConfigurationApi.rejected,
        (state, action) => {
          state.UpdateAllOrganizationLevelConfigurationData = null;
          state.Responsemessage = action.payload || "";
        }
      )

      //Change Password APi Reducer Data
      .addCase(ChangePasswordApi.pending, (state) => {
        // state.loading = true;
      })
      .addCase(ChangePasswordApi.fulfilled, (state, action) => {
        state.changePasswordData = action.payload;
        state.Responsemessage = action.payload.code || "";
      })
      .addCase(ChangePasswordApi.rejected, (state, action) => {
        state.changePasswordData = null;
        state.Responsemessage = action.payload || "";
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
        state.Responsemessage = action.payload || "";
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
        state.Responsemessage = action.payload || "";
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
        state.Responsemessage = action.payload || "";
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
          state.Responsemessage = action.payload || "";
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
        state.Responsemessage = action.payload || "";
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
        state.Responsemessage = action.payload || "";
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
        state.Responsemessage = action.payload || "";
      })

      // Trial Extended Download Report Api
      .addCase(trialExtendedReportApi.pending, (state) => {
        // state.loading = false;
      })
      .addCase(trialExtendedReportApi.fulfilled, (state, action) => {
        state.Responsemessage = "Success";
      })
      .addCase(trialExtendedReportApi.rejected, (state, action) => {
        state.Responsemessage = action.payload || "";
      })

      // Trial Subscribe Download Report Api
      .addCase(trialSubscribeReportApi.pending, (state) => {
        // state.loading = false;
      })
      .addCase(trialSubscribeReportApi.fulfilled, (state, action) => {
        state.Responsemessage = "Success";
      })
      .addCase(trialSubscribeReportApi.rejected, (state, action) => {
        state.Responsemessage = action.payload || "";
      })

      // Trial Subscription Expired Download Report Api
      .addCase(trialSubscribeExpiredReportApi.pending, (state) => {
        // state.loading = false;
      })
      .addCase(trialSubscribeExpiredReportApi.fulfilled, (state, action) => {
        state.Responsemessage = "Success";
      })
      .addCase(trialSubscribeExpiredReportApi.rejected, (state, action) => {
        state.Responsemessage = action.payload || "";
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
        state.Responsemessage = action.payload || "";
      })

      //get PackageDetail Modal Api
      .addCase(UpdateGlobalAdminUserApi.pending, (state) => {
        // state.loading = true;
      })
      .addCase(UpdateGlobalAdminUserApi.fulfilled, (state, action) => {
        state.updateGlobalUser = action.payload;
        state.Responsemessage = action.payload.code || "";
      })
      .addCase(UpdateGlobalAdminUserApi.rejected, (state, action) => {
        state.updateGlobalUser = null;
        state.Responsemessage = action.payload || "";
      })

      // Trial Subscription Expired Download Report Api
      .addCase(trialReportExportApi.pending, (state) => {
        // state.loading = false;
      })
      .addCase(trialReportExportApi.fulfilled, (state, action) => {
        state.Responsemessage = "Success";
      })
      .addCase(trialReportExportApi.rejected, (state, action) => {
        state.Responsemessage = action.payload || "";
      })

      // for html modal dashboard sendInvoice Api
      .addCase(getInvoiceHtmlApi.pending, (state) => {
        // state.loading = false;
      })
      .addCase(getInvoiceHtmlApi.fulfilled, (state, action) => {
        state.htmlStringData = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(getInvoiceHtmlApi.rejected, (state, action) => {
        state.htmlStringData = null;
        state.Responsemessage = action.payload || "";
      })

      // for ListOfAllTheActiveOrganizationEssentialLisences in dashboard for essential Pageice Api
      .addCase(getAllListOrganizationEssentialApi.pending, (state) => {
        // state.loading = false;
      })
      .addCase(
        getAllListOrganizationEssentialApi.fulfilled,
        (state, action) => {
          state.getAllListOrganizationEssentialData = action.payload;
          state.Responsemessage = "Success";
        }
      )
      .addCase(getAllListOrganizationEssentialApi.rejected, (state, action) => {
        state.getAllListOrganizationEssentialData = null;
        state.Responsemessage = action.payload || "";
      })

      // for ListOfAllTheActiveOrganizationProfessionalLisences in dashboard for Professional Tab Page Api
      .addCase(getAllListOrganizationProfessionalApi.pending, (state) => {
        // state.loading = false;
      })
      .addCase(
        getAllListOrganizationProfessionalApi.fulfilled,
        (state, action) => {
          state.getAllListOrganizationProfessionalData = action.payload;
          state.Responsemessage = "Success";
        }
      )
      .addCase(
        getAllListOrganizationProfessionalApi.rejected,
        (state, action) => {
          state.getAllListOrganizationProfessionalData = null;
          state.Responsemessage = action.payload || "";
        }
      )

      // for ListOfAllTheActiveOrganizationPremiumLisences in dashboard for Premium Tab Page Api
      .addCase(getAllListOrganizationPremiumApi.pending, (state) => {
        // state.loading = false;
      })
      .addCase(getAllListOrganizationPremiumApi.fulfilled, (state, action) => {
        state.getAllListOrganizationPremiumData = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(getAllListOrganizationPremiumApi.rejected, (state, action) => {
        state.getAllListOrganizationPremiumData = null;
        state.Responsemessage = action.payload || "";
      })

      // Essential Download Report Api
      .addCase(essentialDownloadExportApi.pending, (state) => {
        // state.loading = false;
      })
      .addCase(essentialDownloadExportApi.fulfilled, (state, action) => {
        state.Responsemessage = "Success";
      })
      .addCase(essentialDownloadExportApi.rejected, (state, action) => {
        state.Responsemessage = action.payload || "";
      })

      // Professional Download Report Api
      .addCase(professionalDownloadExportApi.pending, (state) => {
        // state.loading = false;
      })
      .addCase(professionalDownloadExportApi.fulfilled, (state, action) => {
        state.Responsemessage = "Success";
      })
      .addCase(professionalDownloadExportApi.rejected, (state, action) => {
        state.Responsemessage = action.payload || "";
      })

      // Premium Download Report Api
      .addCase(premiumDownloadExportApi.pending, (state) => {
        // state.loading = false;
      })
      .addCase(premiumDownloadExportApi.fulfilled, (state, action) => {
        state.Responsemessage = "Success";
      })
      .addCase(premiumDownloadExportApi.rejected, (state, action) => {
        state.Responsemessage = action.payload || "";
      })

      //GetGlobalLevel Configuration  APi Reducer Data
      .addCase(getGlobalLevelConfigurationsApi.pending, (state) => {
        // state.loading = true;
      })
      .addCase(getGlobalLevelConfigurationsApi.fulfilled, (state, action) => {
        state.getGlobalLevelConfigData = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(getGlobalLevelConfigurationsApi.rejected, (state, action) => {
        state.getGlobalLevelConfigData = null;
        state.Responsemessage = action.payload || "";
      })

      // Update global Admin Configurations Level
      .addCase(UpdateGlobalLevelConfigurationApi.pending, (state) => {
        // state.loading = true;
      })
      .addCase(UpdateGlobalLevelConfigurationApi.fulfilled, (state, action) => {
        state.UpdateGlobalLevelConfigData = action.payload;
        state.Responsemessage = action.payload.code || "";
      })
      .addCase(UpdateGlobalLevelConfigurationApi.rejected, (state, action) => {
        state.UpdateGlobalLevelConfigData = null;
        state.Responsemessage = action.payload || "";
      })

      //Get all packages synamic tabs Api data
      .addCase(getAllPackagesDynamicTabsApi.pending, (state) => {
        // state.loading = true;
      })
      .addCase(getAllPackagesDynamicTabsApi.fulfilled, (state, action) => {
        state.getPackagesDynamicTabs = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(getAllPackagesDynamicTabsApi.rejected, (state, action) => {
        state.getPackagesDynamicTabs = null;
        state.Responsemessage = action.payload || "";
      })

      //Get listOfPackageLisencesMainApi Api data
      .addCase(listOfPackageLisencesMainApi.pending, (state) => {
        // state.loading = true;
      })
      .addCase(listOfPackageLisencesMainApi.fulfilled, (state, action) => {
        state.listOfPackageLisencesData = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(listOfPackageLisencesMainApi.rejected, (state, action) => {
        state.listOfPackageLisencesData = null;
        state.Responsemessage = action.payload || "";
      })

      //get all organization Names main APi
      .addCase(getAllOrganizationNameMainApi.pending, (state) => {
        // state.loading = true;
      })
      .addCase(getAllOrganizationNameMainApi.fulfilled, (state, action) => {
        state.getOrganizationNames = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(getAllOrganizationNameMainApi.rejected, (state, action) => {
        state.getOrganizationNames = null;
        state.Responsemessage = action.payload || "";
      })

      // for download dynamically report reducer
      .addCase(dynamicalyDownloadReportApi.pending, (state) => {
        // state.loading = true;
      })
      .addCase(dynamicalyDownloadReportApi.fulfilled, (state, action) => {
        state.downloadDynamicallyReportData = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(dynamicalyDownloadReportApi.rejected, (state, action) => {
        state.downloadDynamicallyReportData = null;
        state.Responsemessage = action.payload || "An error occurred";
      })

      //Get All Organization Audit Listing
      .addCase(getOrganizationUserAuditListingAPI.pending, (state) => {
        // state.loading = true;
      })
      .addCase(
        getOrganizationUserAuditListingAPI.fulfilled,
        (state, action) => {
          state.getOrganizationAuditListingData = action.payload;
          state.Responsemessage = "Success";
        }
      )
      .addCase(getOrganizationUserAuditListingAPI.rejected, (state, action) => {
        state.getOrganizationAuditListingData = null;
        state.Responsemessage = action.payload || "An error occurred";
      })

      //Get All Organization Audit Actions
      .addCase(getOrganizationUserAuditActionsAPI.pending, (state) => {
        // state.loading = true;
      })
      .addCase(
        getOrganizationUserAuditActionsAPI.fulfilled,
        (state, action) => {
          state.getAuditActions = action.payload;
          state.Responsemessage = "Success";
        }
      )
      .addCase(getOrganizationUserAuditActionsAPI.rejected, (state, action) => {
        state.getAuditActions = null;
        state.Responsemessage = action.payload || "An error occurred";
        state.Responsemessage = action.payload || "";
      })

      // for download Invoice Report reducer
      .addCase(downloadInvoiceReportMainApi.pending, (state) => {
        // state.loading = true;
      })
      .addCase(downloadInvoiceReportMainApi.fulfilled, (state, action) => {
        state.downloadInvoiceData = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(downloadInvoiceReportMainApi.rejected, (state, action) => {
        state.downloadInvoiceData = null;
        state.Responsemessage = action.payload || "";
      })

      // for download Invoice Report reducer
      .addCase(getUserInfoMainApi.pending, (state) => {
        // state.loading = true;
      })
      .addCase(getUserInfoMainApi.fulfilled, (state, action) => {
        state.getUserInfoData = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(getUserInfoMainApi.rejected, (state, action) => {
        state.getUserInfoData = null;
        state.Responsemessage = action.payload || "";
      });
  },
});

export const { globalAdminDashBoardLoader, resetResponseMessage } =
  globalAdminDashboardReducer.actions;
export default globalAdminDashboardReducer.reducer;
