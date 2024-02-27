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
};
