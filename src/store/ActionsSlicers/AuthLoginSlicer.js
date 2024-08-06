import { createSlice } from "@reduxjs/toolkit";
import {
  GlobalAdminLogOutApi,
  PasswordVerificationApi,
  enterEmailValidation,
  forgotPasswordMainnApi,
  otpVerifyMainApi,
  passwordCreationMainApi,
} from "../Actions/AuthActions";

const initialState = {
  loading: false,
  Authresponse: null,
  Responsemessage: "",
  passwordVerifyData: null,
  forgotPasswordData: null,
  logOutData: null,
  OtpData: null,
  passwordCreateData: null,
};

const AuthActionsSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    resetAuthResponseMessage: (state, { payload }) => {
      state.Responsemessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(enterEmailValidation.pending, (state) => {
        state.loading = true;
      })
      .addCase(enterEmailValidation.fulfilled, (state, action) => {
        if (action.payload.code === "EmailValidation_03") {
          localStorage.setItem(
            "userID",
            JSON.stringify(action.payload.result.userID)
          );
        }
        state.loading = false;
        state.Authresponse = action.payload;
        state.Responsemessage = action.payload.code || "";
      })
      .addCase(enterEmailValidation.rejected, (state, action) => {
        state.loading = false;
        state.Authresponse = null;
        state.Responsemessage = action.payload || "";
      })
      .addCase(PasswordVerificationApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(PasswordVerificationApi.fulfilled, (state, action) => {
        state.loading = false;
        state.passwordVerifyData = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(PasswordVerificationApi.rejected, (state, action) => {
        state.loading = false;
        state.passwordVerifyData = null;
        state.Responsemessage = action.payload || "";
      })

      .addCase(GlobalAdminLogOutApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(GlobalAdminLogOutApi.fulfilled, (state, action) => {
        state.loading = false;
        state.logOutData = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(GlobalAdminLogOutApi.rejected, (state, action) => {
        state.loading = false;
        state.logOutData = null;
        state.Responsemessage = action.payload || "";
      })

      .addCase(forgotPasswordMainnApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPasswordMainnApi.fulfilled, (state, action) => {
        state.loading = false;
        state.forgotPasswordData = action.payload;
        state.Responsemessage = action.payload.code || "";
      })
      .addCase(forgotPasswordMainnApi.rejected, (state, action) => {
        state.loading = false;
        state.forgotPasswordData = null;
        state.Responsemessage = action.payload || "";
      })

      .addCase(otpVerifyMainApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(otpVerifyMainApi.fulfilled, (state, action) => {
        state.loading = false;
        state.logOutData = action.payload;
        state.Responsemessage = action.payload.code || "";
      })
      .addCase(otpVerifyMainApi.rejected, (state, action) => {
        state.loading = false;
        state.logOutData = null;
        state.Responsemessage = action.payload || "";
      })

      .addCase(passwordCreationMainApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(passwordCreationMainApi.fulfilled, (state, action) => {
        state.loading = false;
        state.passwordCreateData = action.payload;
        state.Responsemessage = action.payload.code || "";
      })
      .addCase(passwordCreationMainApi.rejected, (state, action) => {
        state.loading = false;
        state.passwordCreateData = null;
        state.Responsemessage = action.payload || "";
      });
  },
});

export const { resetAuthResponseMessage } = AuthActionsSlice.actions;
export default AuthActionsSlice.reducer;
