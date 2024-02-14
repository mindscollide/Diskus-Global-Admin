import { createSlice } from "@reduxjs/toolkit";
import { enterEmailValidation } from "../Actions/AuthActions";

const initialState = {
  loading: false,
  Authresponse: null,
  Responsemessage: "",
};

const EmailValidationSlice = createSlice({
  name: "EmailValidation",
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
      });
  },
});

export default EmailValidationSlice.reducer;
