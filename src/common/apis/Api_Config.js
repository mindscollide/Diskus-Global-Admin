const loginAPi = {
  RequestMethod: "ServiceManager.LoginWithGlobalEmail",
};

const passwordVerify = {
  RequestMethod: "ServiceManager.GlobalPasswordVerification",
};

const loginHistory = {
  RequestMethod: "ServiceManager.GetUserLoginHistory",
};

const searchOrganization = {
  RequestMethod: "ServiceManager.SearchOrganization",
};

const editSubscription = {
  RequestMethod: "ServiceManager.UpdateOrganizationSubscriptionStatus",
};

const editOrganization = {
  RequestMethod: "ServiceManager.UpdateOrganizationStatus",
};

const getAllOrganization = {
  RequestMethod: "ServiceManager.GetAllOrganization",
};

const statsOfActiveLicenses = {
  RequestMethod: "ServiceManager.StatsOfTotalActiveLisences",
};

const OrganizationsByActiveLicense = {
  RequestMethod: "ServiceManager.ListOfAllTheActiveOrganizationWiseLisences",
};

const GetAllBillingDue = {
  RequestMethod: "ServiceManager.GetAllBillingDue",
};

const TotalThisMonthDue = {
  RequestMethod: "ServiceManager.TotalThisMonthDue",
};

// stats of organizations by subscription Type
const statOrganizationBySubType = {
  RequestMethod: "ServiceManager.StatsOfOrganizationsBySubscriptionType",
};

const OrganizationBySubscriptiontype = {
  RequestMethod: "ServiceManager.OrganizationsBySubscriptionType",
};

//Login History Blling Due Report
const billingDueReport = {
  RequestMethod: "ServiceManager.LoginHistoryReport",
};

//Main DashBoard Billing Due Report

const dashboardBillingDueReport = {
  RequestMethod: "ServiceManager.BillingDueReport",
};

//sendInvoice
const sendInvoice = {
  RequestMethod: "ServiceManager.SendInvoice",
};

//GetAllPackagesWithFeaturesGlobalAdmin
const GetAllPackagesWithFeaturesGlobalAdmin = {
  RequestMethod: "ServiceManager.GetAllPackagesWithFeaturesGlobalAdmin",
};

//UpdatePackagePriceGlobalAdmin
const UpdatePackagePriceGlobalAdmin = {
  RequestMethod: "ServiceManager.UpdatePackagePriceGlobalAdmin",
};

//GetSystemConfigurations
const GetSystemConfigurations = {
  RequestMethod: "ServiceManager.GetAllOrganizationLevelConfiguration",
};

//UpdateAllOrganizationLevelConfiguration
const UpdateAllOrganizationLevelConfiguration = {
  RequestMethod: "ServiceManager.UpdateAllOrganizationLevelConfiguration",
};

//Change password GlobalAdmin
const ChangePassword = {
  RequestMethod: "ServiceManager.ChangePasswordGlobalAdmin",
};

//userLogout
const GlobalAdminLogout = {
  RequestMethod: "ServiceManager.LogOut",
};

// for cashFLow services
const cashInFlow = {
  RequestMethod: "ServiceManager.GetCashFlows",
};

// for cashOutstanding Flow services
const cashOutFlow = {
  RequestMethod: "ServiceManager.GetCashOutFlows",
};

//For listofTrialSubscription on Trial api
const trialDashboardApi = {
  RequestMethod: "ServiceManager.ListOfTrialSubscriptions",
};

//For ListOfExtendedTrailSubscriptions on Trial Extended Api
const trialExtendedDashboardApi = {
  RequestMethod: "ServiceManager.ListOfExtendedTrailSubscriptions",
};

//For ListOfSubscribedSubscriptions on Subscribed Api
const listOfSubscribedSubscriptionsApi = {
  RequestMethod: "ServiceManager.ListOfSubscribedSubscriptions",
};

//For ListOfExpiredSubscriptions on Subscription Expired Api
const listOfExpiredSubscriptionsApi = {
  RequestMethod: "ServiceManager.ListOfExpiredSubscriptions",
};

// Trial Renew Modal
const trialRenewModal = {
  RequestMethod: "ServiceManager.TrailRenew",
};

// for download ListOfExtendedTrailSubscriptions report on subscribe trial
const downloadTrialExtendedReport = {
  RequestMethod: "ServiceManager.ListOfExtendedTrailSubscriptions",
};

// for download ListOfSubscribedSubscriptions report on subscribe trial
const downloadTrialSubscribedReport = {
  RequestMethod: "ServiceManager.ListOfSubscribedSubscriptions",
};

// for download ListOfExpiredTrialSubscriptions report on expired Subscription trial
const downloadExpiredTrialSubscriptionReport = {
  RequestMethod: "ServiceManager.ListOfExpiredSubscriptions",
};

// for Package Details Modal
const getPackageDetailsModal = {
  RequestMethod: "ServiceManager.GetPackageDetailsForGlobalAdmin",
};

// for user Update Modal Api
const UpdateGlobalAdminUser = {
  RequestMethod: "ServiceManager.UpdateGlobalAdminUser",
};

// for download ListOfTrialSubscriptions report on Trial Api
const downloadTrialReport = {
  RequestMethod: "ServiceManager.ExportListOfTrialSubscriptions",
};

// for getInvoiceHTMLbyorganizationID modal on sendInvoice Button
const getInvoiceHtmlOrganization = {
  RequestMethod: "ServiceManager.GetInvoiceHtmlByOrganizationID",
};

export {
  loginAPi,
  passwordVerify,
  loginHistory,
  searchOrganization,
  editSubscription,
  editOrganization,
  getAllOrganization,
  statsOfActiveLicenses,
  OrganizationsByActiveLicense,
  GetAllBillingDue,
  TotalThisMonthDue,
  statOrganizationBySubType,
  OrganizationBySubscriptiontype,
  billingDueReport,
  dashboardBillingDueReport,
  sendInvoice,
  GetAllPackagesWithFeaturesGlobalAdmin,
  UpdatePackagePriceGlobalAdmin,
  GetSystemConfigurations,
  UpdateAllOrganizationLevelConfiguration,
  ChangePassword,
  GlobalAdminLogout,
  cashInFlow,
  cashOutFlow,
  trialDashboardApi,
  trialExtendedDashboardApi,
  listOfSubscribedSubscriptionsApi,
  listOfExpiredSubscriptionsApi,
  trialRenewModal,
  downloadTrialExtendedReport,
  downloadTrialSubscribedReport,
  downloadExpiredTrialSubscriptionReport,
  getPackageDetailsModal,
  UpdateGlobalAdminUser,
  downloadTrialReport,
  getInvoiceHtmlOrganization,
};
