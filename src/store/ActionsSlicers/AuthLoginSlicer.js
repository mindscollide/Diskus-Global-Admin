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
        state.loading = false;
        // Adapt this to match the structure of your successful response
        state.Authresponse = action.payload;
        state.Responsemessage = "Success"; // Customize based on your API response
      })
      .addCase(enterEmailValidation.rejected, (state, action) => {
        state.loading = false;
        state.Authresponse = null;
        state.Responsemessage = action.payload || "An error occurred"; // Customize error handling
      });
  },
});

export default EmailValidationSlice.reducer;
