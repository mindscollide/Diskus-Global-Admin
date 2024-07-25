import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  GlobalAdminLogout,
  loginAPi,
  passwordVerify,
  forgotPasswordApi,
} from "../../common/apis/Api_Config";
import { authenticationURL } from "../../common/apis/Api_endPoints";
import { changeScreen } from "../ActionsSlicers/AuthScreenActionSlicer";

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
            return rejectWithValue("Device does not exists");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_LoginWithGlobalEmail_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Device ID does not exists");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_LoginWithGlobalEmail_03".toLowerCase()
              )
          ) {
            dispatch(changeScreen("PasswordVerification"));
            return {
              result: response.data.responseResult,
              code: "EmailValidation_03",
            };
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_LoginWithGlobalEmail_04".toLowerCase()
              )
          ) {
            return rejectWithValue(
              "User's password is created but something went wrong."
            );
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_LoginWithGlobalEmail_05".toLowerCase()
              )
          ) {
            return rejectWithValue("password not created");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_LoginWithGlobalEmail_06".toLowerCase()
              )
          ) {
            return rejectWithValue("email is not verified");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_LoginWithGlobalEmail_07".toLowerCase()
              )
          ) {
            return rejectWithValue("email does not exist");
          } else {
            return rejectWithValue("Something-went-wrong");
          }
        } else {
          return rejectWithValue("Something-went-wrong");
        }
      } else {
        return rejectWithValue("Something-went-wrong");
      }
    } catch (error) {
      return rejectWithValue("Something-went-wrong");
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
            return rejectWithValue("Device does not exists");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_GlobalPasswordVerification_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Device ID does not exists");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_GlobalPasswordVerification_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Account is Blocked");
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
            return rejectWithValue("Password not verified");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_GlobalPasswordVerification_07".toLowerCase()
              )
          ) {
            return rejectWithValue("Something-went-wrong");
          } else {
            return rejectWithValue("Something-went-wrong");
          }
        } else {
          return rejectWithValue("Something-went-wrong");
        }
      } else {
        return rejectWithValue("Something-went-wrong");
      }
    } catch (error) {
      return rejectWithValue("Something-went-wrong");
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
  async ({ RequestData }, { rejectWithValue, dispatch }) => {
    let token = localStorage.getItem("token");
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
            return rejectWithValue("Invalid Token");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_LogOut_03".toLowerCase())
          ) {
            return rejectWithValue("Something-went-wrong");
          } else {
            return rejectWithValue("Something-went-wrong");
          }
        } else {
          return rejectWithValue("Something-went-wrong");
        }
      } else {
        return rejectWithValue("Something-went-wrong");
      }
    } catch (error) {
      return rejectWithValue("Something-went-wrong");
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
            return rejectWithValue("Device does not exists");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_ForgotPassword_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Device ID does not exists");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_ForgotPassword_03".toLowerCase()
              )
          ) {
            dispatch(changeScreen("VerificationCode"));
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
            try {
              return {
                result: response.data.responseResult,
                code: "ForgotPassword_03",
              };
            } catch (error) {
              console.log(error);
            }
            return rejectWithValue("OTP has been sent to your email");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_ForgotPassword_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Failed to generate OTP");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_ForgotPassword_05".toLowerCase()
              )
          ) {
            return rejectWithValue("Failed to identify user");
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_ForgotPassword_06".toLowerCase()
              )
          ) {
            return rejectWithValue("Something-went-wrong");
          }
        } else {
          return rejectWithValue("Something-went-wrong");
        }
      } else {
        return rejectWithValue("Something-went-wrong");
      }
    } catch (error) {
      return rejectWithValue("Something-went-wrong");
    }
  }
);
