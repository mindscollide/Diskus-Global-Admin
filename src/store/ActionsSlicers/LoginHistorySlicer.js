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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LoginHistoryAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(LoginHistoryAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.loginHistoryData = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(LoginHistoryAPI.rejected, (state, action) => {
        state.loading = false;
        state.loginHistoryData = null;
        state.Responsemessage = action.payload || "An error occurred";
      });
  },
});

export default loginHistorySlice.reducer;
