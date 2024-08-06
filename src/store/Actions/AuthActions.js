import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  GlobalAdminLogout,
  loginAPi,
  passwordVerify,
  forgotPasswordApi,
  verifyOtpMailApi,
  resendOTPApi,
  passwordCreationUpdation,
} from "../../common/apis/Api_Config";
import { authenticationURL } from "../../common/apis/Api_endPoints";
import { changeScreen } from "../ActionsSlicers/AuthScreenActionSlicer";
import {
  getLastLanguageMainApi,
  setLastSelectedLanguageMainApi,
} from "./LanguageActions";

const logoutChannel = new BroadcastChannel("logout");
//Email Verification
export const enterEmailValidation = createAsyncThunk(
  "Auth/EmailValidation",
  async ({ email, navigate, t }, { rejectWithValue, dispatch }) => {
    let data = {
      UserEmail: email,
      Device: "Browser",
      DeviceID: "1",
    };
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append("RequestMethod", loginAPi.RequestMethod);

    try {
      const response = await axios({
        method: "post",
        url: authenticationURL,
        data: form,
      });

      if (response.data.responseCode === 417) {
      } else if (response.data.responseCode === 200) {
        if (response.data.responseResult.isExecuted === true) {
          if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_LoginWithGlobalEmail_01".toLowerCase()
              )
          ) {
            return rejectWithValue(t("Device-does-not-exists"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_LoginWithGlobalEmail_02".toLowerCase()
              )
          ) {
            return rejectWithValue(t("Device-ID-does-not-exists"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_LoginWithGlobalEmail_03".toLowerCase()
              )
          ) {
            localStorage.setItem("userID", response.data.responseResult.userID);
            let data = {
              UserID: JSON.parse(response.data.responseResult.userID),
            };
            dispatch(getLastLanguageMainApi({ data, navigate, t }));
            dispatch(changeScreen("PasswordVerification"));
            return {
              result: response.data.responseResult,
              code: t("User's-password-is-created"),
            };
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_LoginWithGlobalEmail_04".toLowerCase()
              )
          ) {
            return rejectWithValue(
              t("User-password-is-created-but-something-went-wrong")
            );
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_LoginWithGlobalEmail_05".toLowerCase()
              )
          ) {
            return rejectWithValue(t("Password-not-created"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_LoginWithGlobalEmail_06".toLowerCase()
              )
          ) {
            return rejectWithValue(t("Email-is-not-verified"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_LoginWithGlobalEmail_07".toLowerCase()
              )
          ) {
            return rejectWithValue(t("Email-does-not-exist"));
          } else {
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

//password Verification
export const PasswordVerificationApi = createAsyncThunk(
  "Auth/PasswordValidation",
  async (requestData, { rejectWithValue }) => {
    let { password, navigate, t } = requestData;
    console.log(navigate, "PasswordValidationPasswordValidation");
    let userID = localStorage.getItem("userID");
    let data = {
      UserID: Number(userID),
      Device: "Browser",
      DeviceID: "1",
      UserPassword: password,
    };
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append("RequestMethod", passwordVerify.RequestMethod);

    try {
      const response = await axios({
        method: "post",
        url: authenticationURL,
        data: form,
      });

      if (response.data.responseCode === 417) {
      } else if (response.data.responseCode === 200) {
        if (response.data.responseResult.isExecuted === true) {
          if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_GlobalPasswordVerification_01".toLowerCase()
              )
          ) {
            return rejectWithValue(t("Device-does-not-exists"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_GlobalPasswordVerification_02".toLowerCase()
              )
          ) {
            return rejectWithValue(t("Device-ID-does-not-exists"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_GlobalPasswordVerification_03".toLowerCase()
              )
          ) {
            return rejectWithValue(t("Account-is-blocked"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_GlobalPasswordVerification_04".toLowerCase()
              )
          ) {
            localStorage.setItem(
              "token",
              response.data.responseResult.authToken.token
            );
            localStorage.setItem(
              "refreshToken",
              response.data.responseResult.authToken.refreshToken
            );
            localStorage.setItem(
              "userRoleId",
              response.data.responseResult.userRoleId
            );
            localStorage.setItem(
              "adminname",
              response.data.responseResult.authToken.name
            );
            localStorage.setItem("currentLanguage", "en");
            navigate("/GlobalAdmin/");
            try {
              return {
                result: response.data.responseResult,
                code: "GlobalPasswordVerification_04",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_GlobalPasswordVerification_05".toLowerCase()
              )
          ) {
            console.log(response.data.responseResult, "includesincludes");
            localStorage.setItem(
              "userEmail",
              response.data.responseResult.authToken.userName
            );
            localStorage.setItem(
              "token",
              response.data.responseResult.authToken.token
            );
            localStorage.setItem(
              "userRoleId",
              response.data.responseResult.userRoleId
            );
            localStorage.setItem(
              "refreshToken",
              response.data.responseResult.authToken.refreshToken
            );
            localStorage.setItem(
              "adminname",
              response.data.responseResult.authToken.name
            );
            localStorage.setItem("currentLanguage", "en");

            navigate("/GlobalAdmin/");
            try {
              return {
                result: response.data.responseResult,
                code: "GlobalPasswordVerification_05",
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_GlobalPasswordVerification_06".toLowerCase()
              )
          ) {
            return rejectWithValue(t("Password-not-verified"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_GlobalPasswordVerification_07".toLowerCase()
              )
          ) {
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

//SignOut Function
const signOut = (navigate, message, dispatch) => {
  logoutChannel.postMessage("Logout");

  window.location.href = window.location.origin + "/";
  let RememberEmailLocal = JSON.parse(localStorage.getItem("rememberEmail"));
  let RememberPasswordLocal = JSON.parse(
    localStorage.getItem("remeberPassword")
  );
  let reLang = localStorage.getItem("i18nextLng");
  if (RememberEmailLocal === true && RememberPasswordLocal === true) {
    let RememberEmailLocalValue = localStorage.getItem("rememberEmailValue");

    let RememberPasswordLocalValue = localStorage.getItem(
      "rememberPasswordValue"
    );
    localStorage.clear();
    if (reLang != undefined && reLang != null) {
      localStorage.setItem("i18nextLng", reLang);
    }
    localStorage.setItem("remeberPassword", RememberPasswordLocal);
    localStorage.setItem("rememberPasswordValue", RememberPasswordLocalValue);
    localStorage.setItem("rememberEmail", RememberEmailLocal);
    localStorage.setItem("rememberEmailValue", RememberEmailLocalValue);
  } else if (RememberEmailLocal === true) {
    let RememberEmailLocalValue = localStorage.getItem("rememberEmailValue");
    localStorage.clear();
    if (reLang != undefined && reLang != null) {
      localStorage.setItem("i18nextLng", reLang);
    }
    localStorage.setItem("rememberEmail", RememberEmailLocal);
    localStorage.setItem("rememberEmailValue", RememberEmailLocalValue);
  } else if (RememberPasswordLocal === true) {
    let RememberPasswordLocalValue = localStorage.getItem(
      "rememberPasswordValue"
    );
    localStorage.clear();
    if (reLang != undefined && reLang != null) {
      localStorage.setItem("i18nextLng", reLang);
    }
    localStorage.setItem("remeberPassword", RememberPasswordLocal);
    localStorage.setItem("rememberPasswordValue", RememberPasswordLocalValue);
  } else {
    localStorage.clear();
    if (reLang != undefined && reLang != null) {
      localStorage.setItem("i18nextLng", reLang);
    }
    localStorage.setItem("rememberEmail", false);
    localStorage.setItem("rememberEmailValue", "");
    localStorage.setItem("remeberPassword", false);
    localStorage.setItem("rememberPasswordValue", "");
  }
};

//GlobalAdmin Logout
export const GlobalAdminLogOutApi = createAsyncThunk(
  "Auth/GlobalAdminLogOutApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
    let { newData, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestMethod", GlobalAdminLogout.RequestMethod);
    try {
      const response = await axios({
        method: "post",
        url: authenticationURL,
        data: form,
        headers: {
          _token: token,
        },
      });

      if (response.data.responseCode === 417) {
      } else if (response.data.responseCode === 200) {
        if (response.data.responseResult.isExecuted === true) {
          if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_LogOut_01".toLowerCase())
          ) {
            signOut();
            return {
              result: response.data.responseResult,
              code: "LogOut_01",
            };
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_LogOut_02".toLowerCase())
          ) {
            return rejectWithValue(t("Invalid-token"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_LogOut_03".toLowerCase())
          ) {
            return rejectWithValue(t("Something-went-wrong"));
          } else {
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

// global admin forgot Password API
export const forgotPasswordMainnApi = createAsyncThunk(
  "forgotPasswordMainnApi/forgotPasswordMainnApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let { email, navigate, t } = requestData;
    let data = {
      Email: email,
      Device: "Browser",
      DeviceID: "1",
    };
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append("RequestMethod", forgotPasswordApi.RequestMethod);

    try {
      const response = await axios({
        method: "post",
        url: authenticationURL,
        data: form,
      });

      if (response.data.responseCode === 417) {
      } else if (response.data.responseCode === 200) {
        if (response.data.responseResult.isExecuted === true) {
          if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_ForgotPassword_01".toLowerCase()
              )
          ) {
            return rejectWithValue(t("Device-does-not-exists"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_ForgotPassword_02".toLowerCase()
              )
          ) {
            return rejectWithValue(t("Device-ID-does-not-exists"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_ForgotPassword_03".toLowerCase()
              )
          ) {
            dispatch(changeScreen("VerificationCode"));
            try {
              return {
                result: response.data.responseResult,
                code: t("OTP-has-been-sent-to-your-email"),
              };
            } catch (error) {
              console.log(error);
            }
            localStorage.setItem(
              "token",
              response.data.responseResult.authToken.token
            );
            localStorage.setItem(
              "refreshToken",
              response.data.responseResult.authToken.refreshToken
            );
            localStorage.setItem(
              "userRoleId",
              response.data.responseResult.userRoleId
            );
            localStorage.setItem(
              "adminname",
              response.data.responseResult.authToken.name
            );
            localStorage.setItem("currentLanguage", "en");
            // navigate("/GlobalAdmin/");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_ForgotPassword_04".toLowerCase()
              )
          ) {
            return rejectWithValue(t("Failed-to-generate-OTP"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_ForgotPassword_05".toLowerCase()
              )
          ) {
            return rejectWithValue(t("Failed-to-identify-user"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_ForgotPassword_06".toLowerCase()
              )
          ) {
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

// global admin forgot Password API
export const otpVerifyMainApi = createAsyncThunk(
  "otpVerifyMainApi/otpVerifyMainApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let { data, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append("RequestMethod", verifyOtpMailApi.RequestMethod);

    try {
      const response = await axios({
        method: "post",
        url: authenticationURL,
        data: form,
      });

      if (response.data.responseCode === 417) {
      } else if (response.data.responseCode === 200) {
        if (response.data.responseResult.isExecuted === true) {
          if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_SignUpManager_UserEmailVerification_01".toLowerCase()
              )
          ) {
            dispatch(changeScreen("PasswordCreation"));
            try {
              return {
                result: response.data.responseResult,
                code: t("The-user's-email-has-been-verified"),
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_SignUpManager_UserEmailVerification_02".toLowerCase()
              )
          ) {
            return rejectWithValue(
              t("Invalid-OTP-failed-to-verify-user-email")
            );
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_SignUpManager_UserEmailVerification_03".toLowerCase()
              )
          ) {
            return rejectWithValue(t("The-user's-email-has-not-been-verified"));
          }
        } else {
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

// global admin resend EMail API
export const resendOTPMainApi = createAsyncThunk(
  "resendOTPMainApi/resendOTPMainApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let { data, setSeconds, setMinutes, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append("RequestMethod", resendOTPApi.RequestMethod);

    try {
      const response = await axios({
        method: "post",
        url: authenticationURL,
        data: form,
      });

      if (response.data.responseCode === 417) {
      } else if (response.data.responseCode === 200) {
        if (response.data.responseResult.isExecuted === true) {
          if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_SignUpManager_GenerateOTP_01".toLowerCase()
              )
          ) {
            setSeconds(60);
            setMinutes(4);
            return "User OTP generated successfully";
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_SignUpManager_GenerateOTP_02".toLowerCase()
              )
          ) {
            setSeconds(0);
            setMinutes(0);
            return rejectWithValue(t("User-OTP-not-generated-successfully"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_SignUpManager_GenerateOTP_03".toLowerCase()
              )
          ) {
            setSeconds(0);
            setMinutes(0);
            return rejectWithValue(t("The-user-email-is-not-active"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_SignUpManager_GenerateOTP_04".toLowerCase()
              )
          ) {
            setSeconds(0);
            setMinutes(0);
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);

// password creation updattion  Api
export const passwordCreationMainApi = createAsyncThunk(
  "passwordCreationMainApi/passwordCreationMainApi",
  async (requestData, { rejectWithValue, dispatch }) => {
    let { data, navigate, t } = requestData;
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append("RequestMethod", passwordCreationUpdation.RequestMethod);

    try {
      const response = await axios({
        method: "post",
        url: authenticationURL,
        data: form,
      });

      if (response.data.responseCode === 417) {
      } else if (response.data.responseCode === 200) {
        if (response.data.responseResult.isExecuted === true) {
          if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_PasswordUpdationOnForgetPassword_01".toLowerCase()
              )
          ) {
            dispatch(changeScreen("UpdatedPassword"));
            try {
              return {
                result: response.data.responseResult,
                code: t("Password-updated-successfully"),
              };
            } catch (error) {
              console.log(error);
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_PasswordUpdationOnForgetPassword_02".toLowerCase()
              )
          ) {
            return rejectWithValue("no password updated");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_PasswordUpdationOnForgetPassword_03".toLowerCase()
              )
          ) {
            return rejectWithValue(t("No-password-updated"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_PasswordUpdationOnForgetPassword_04".toLowerCase()
              )
          ) {
            return rejectWithValue(t("Something-went-wrong"));
          }
        } else {
          return rejectWithValue(t("Something-went-wrong"));
        }
      } else {
        return rejectWithValue(t("Something-went-wrong"));
      }
    } catch (error) {
      return rejectWithValue(t("Something-went-wrong"));
    }
  }
);
