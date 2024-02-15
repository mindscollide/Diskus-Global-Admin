import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Ensure axios is imported
import { loginAPi } from "../../common/apis/Api_Config";
import { authenticationAPI } from "../../common/apis/Api_endPoints";

export const enterEmailValidation = createAsyncThunk(
  "EmailValidation/enterEmail",
  async ({ value, navigate, t }, { rejectWithValue }) => {
    let data = {
      UserEmail: value,
      Device: "Browser",
      DeviceID: "1",
    };
    let form = new FormData();
    form.append("RequestData", JSON.stringify(data));
    form.append("RequestMethod", loginAPi.RequestMethod);

    try {
      const response = await axios({
        method: "post",
        url: authenticationAPI,
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
