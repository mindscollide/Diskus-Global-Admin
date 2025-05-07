import { createSlice } from "@reduxjs/toolkit";
import {
  getSystemLanguageMainApi,
  getLastLanguageMainApi,
  setLastSelectedLanguageMainApi,
} from "../Actions/LanguageActions";

const initialState = {
  loading: false,
  getSystemLanguage: [],
  lastLanguageData: null,
  setLastLanguageData: null,
  Responsemessage: "",
};

const LanguageSlicer = createSlice({
  name: "languageSystem",
  initialState,
  reducers: {
    languageLoader: (state, { payload }) => {
      state.loading = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSystemLanguageMainApi.pending, (state) => {
        // state.loading = false;
      })
      .addCase(getSystemLanguageMainApi.fulfilled, (state, action) => {
        console.log(action, "payloadpayload");
        // state.loading = false;
        state.getSystemLanguage = action.payload.result;
        state.Responsemessage = "Success";
      })
      .addCase(getSystemLanguageMainApi.rejected, (state, action) => {
        // state.loading = false;
        state.getSystemLanguage = [];
        state.Responsemessage = action.payload || "";
      })

      .addCase(getLastLanguageMainApi.pending, (state) => {
        // state.loading = false;
      })
      .addCase(getLastLanguageMainApi.fulfilled, (state, action) => {
        // state.loading = false;
        state.lastLanguageData = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(getLastLanguageMainApi.rejected, (state, action) => {
        // state.loading = false;
        state.lastLanguageData = null;
        state.Responsemessage = action.payload || "";
      })

      .addCase(setLastSelectedLanguageMainApi.pending, (state) => {
        // state.loading = false;
      })
      .addCase(setLastSelectedLanguageMainApi.fulfilled, (state, action) => {
        // state.loading = false;
        state.setLastLanguageData = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(setLastSelectedLanguageMainApi.rejected, (state, action) => {
        // state.loading = false;
        state.setLastLanguageData = [];
        state.Responsemessage = action.payload || "";
      });
  },
});
export const { languageLoader } = LanguageSlicer.actions;
export default LanguageSlicer.reducer;
