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

// for Get All Package Names in Essential, Professional and Premium dynamic tabs
const getAllPackages = {
  RequestMethod: "ServiceManager.GetAllPackageNames",
};

// for Delete Main Package  in Package page
const deleteMainPackage = {
  RequestMethod: "ServiceManager.DeletePackage",
};

// for package feature in package Main Page
const getAllPackageFeature = {
  RequestMethod: "ServiceManager.GetAllPackagesWithFeaturesGlobalAdmin",
};

// for ListOfAllTheActiveOrganizationEssentialLisences in dashboard for essential Page
const getAllListOrganizationEssentialLisences = {
  RequestMethod:
    "ServiceManager.ListOfAllTheActiveOrganizationEssentialLisences",
};

// for ListOfAllTheActiveOrganizationProfessionalLisences in dashboard for Professional Page
const getAllListOrganizationProfessionalLisences = {
  RequestMethod:
    "ServiceManager.ListOfAllTheActiveOrganizationProfessionalLisences",
};

// for ListOfAllTheActiveOrganizationPremiumLisences in dashboard for Premium Page
const getAllListOrganizationPremiumLisences = {
  RequestMethod: "ServiceManager.ListOfAllTheActiveOrganizationPremiumLisences",
};

// for AddUpdatePackage(Create) in Main package page
const addUpdatePackagesApi = {
  RequestMethod: "ServiceManager.AddUpdatePackage",
};

// for export Essential Report
const downloadEssentialReport = {
  RequestMethod: "ServiceManager.ActiveLicensesEssential",
};

// for download Professional Report
const downloadProfessionalReport = {
  RequestMethod: "ServiceManager.ActiveLicensesProfessional",
};

// for download Premium Report
const downloadPremiumReport = {
  RequestMethod: "ServiceManager.ActiveLicensesPremium",
};

// for delete Package Feature from features in Packages Page
const deletePackageFeature = {
  RequestMethod: "ServiceManager.DeletePackageFeature",
};

//for getPackageFeature in Dropdown in Package Main Page
const getPackageFeature = {
  RequestMethod: "ServiceManager.GetPackageFeature",
};

// for add package Feature from dropdown and show below the dropdown in Package Main Page
const addPackageFeature = {
  RequestMethod: "ServiceManager.AddUpdatePackageFeature",
};

// for create Package Feature Mapping
const createPackageFeatures = {
  RequestMethod: "ServiceManager.CreatePackageFeatureMapping",
};

// for get Global Level Configuration
const getGlobalLevelConfiguration = {
  RequestMethod: "ServiceManager.GetGlobalLevelConfiguration",
};

// for Update Global Level Configuration
const updateGlobalLevelConfiguration = {
  RequestMethod: "ServiceManager.UpdateGlobalLevelConfiguration",
};

// for get ListOfAllTheActiveOrganizationPackageLisences
const listOfPackageLisences = {
  RequestMethod: "ServiceManager.ListOfAllTheActiveOrganizationPackageLisences",
};

// for get All organizatons Names and ID Api for dropdown
const getAllOrganizationNamesApi = {
  RequestMethod: "ServiceManager.GetAllOrganizationNames",
};

// for dunamic tabs report excel download Api
const dynamicallyReportOfActivePackageLicensesApi = {
  RequestMethod: "ServiceManager.ActivePackageLicenses",
};

//Get Audit listing Orgnization
const getorganizationAuditlistingApi = {
  RequestMethod: "ServiceManager.GetOrganizationUsersAuditListing",
};

//Get Audit Action
const getorganizationAuditlActionsApi = {
  RequestMethod: "ServiceManager.GetUserAuditActions",
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
  getAllPackages,
  deleteMainPackage,
  getAllPackageFeature,
  getAllListOrganizationEssentialLisences,
  getAllListOrganizationProfessionalLisences,
  getAllListOrganizationPremiumLisences,
  addUpdatePackagesApi,
  downloadEssentialReport,
  downloadProfessionalReport,
  downloadPremiumReport,
  deletePackageFeature,
  getPackageFeature,
  addPackageFeature,
  createPackageFeatures,
  getGlobalLevelConfiguration,
  updateGlobalLevelConfiguration,
  listOfPackageLisences,
  getAllOrganizationNamesApi,
  dynamicallyReportOfActivePackageLicensesApi,
  getorganizationAuditlistingApi,
  getorganizationAuditlActionsApi,
};
