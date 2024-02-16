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

const getAllOrganization = {
  RequestMethod: "ServiceManager.GetAllOrganization",
};

export {
  loginAPi,
  passwordVerify,
  loginHistory,
  searchOrganization,
  getAllOrganization,
};
