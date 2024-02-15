import { createSlice } from "@reduxjs/toolkit";
import { LoginHistoryAPI } from "../Actions/LoginHistoryActions";

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
        state.Responsemessage = action.payload || "An error occurred";
      });
  },
});
export const { loginHistoryLoader } = loginHistorySlice.actions;
export default loginHistorySlice.reducer;
