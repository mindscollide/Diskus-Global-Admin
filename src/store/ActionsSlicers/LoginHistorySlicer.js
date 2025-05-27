import { createSlice } from "@reduxjs/toolkit";
import {
  AuditTrialReportApi,
  LoginHistoryAPI,
  LogingHistoryReportApi,
} from "../Actions/LoginHistoryActions";

const initialState = {
  loading: false,
  loginHistoryData: null,
  Responsemessage: "",
};

const loginHistorySlice = createSlice({
  name: "LoginHistory",
  initialState,
  reducers: {
    loginHistoryLoader: (state, { payload }) => {
      console.log(payload, "payloadpayloadpayloadpayload");
      state.loading = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginHistoryAPI.pending, (state) => {
        // state.loading = false;
      })
      .addCase(LoginHistoryAPI.fulfilled, (state, action) => {
        // state.loading = false;
        state.loginHistoryData = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(LoginHistoryAPI.rejected, (state, action) => {
        // state.loading = false;
        state.loginHistoryData = null;
        state.Responsemessage = action.payload || "";
      })
      //Billing Due Report
      .addCase(LogingHistoryReportApi.pending, (state) => {
        // state.loading = false;
      })
      .addCase(LogingHistoryReportApi.fulfilled, (state, action) => {
        state.Responsemessage = "Success";
      })
      .addCase(LogingHistoryReportApi.rejected, (state, action) => {
        state.Responsemessage = action.payload || "";
      })

      //Audit Trial Report
      .addCase(AuditTrialReportApi.pending, (state) => {
        // state.loading = false;
      })
      .addCase(AuditTrialReportApi.fulfilled, (state, action) => {
        state.Responsemessage = "Success";
      })
      .addCase(AuditTrialReportApi.rejected, (state, action) => {
        state.Responsemessage = action.payload || "";
      });
  },
});
export const { loginHistoryLoader } = loginHistorySlice.actions;
export default loginHistorySlice.reducer;
