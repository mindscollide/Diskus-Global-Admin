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
};
