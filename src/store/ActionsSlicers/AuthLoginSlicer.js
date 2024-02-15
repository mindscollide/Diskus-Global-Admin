import { createSlice } from "@reduxjs/toolkit";
import {
  PasswordVerificationApi,
  enterEmailValidation,
} from "../Actions/AuthActions";

const initialState = {
  loading: false,
  Authresponse: null,
  Responsemessage: "",
  passwordVerifyData: null,
};

const AuthActionsSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {},
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
        state.Responsemessage = "Success";
      })
      .addCase(enterEmailValidation.rejected, (state, action) => {
        state.loading = false;
        state.Authresponse = null;
        state.Responsemessage = action.payload || "An error occurred";
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
        state.Responsemessage = action.payload || "An error occurred";
      });
  },
});

export default AuthActionsSlice.reducer;
