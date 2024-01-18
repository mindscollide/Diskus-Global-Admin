import { createSlice } from "@reduxjs/toolkit";

// set initial state for login
const initiaStateValue = {
  screenName: "login",
};

// set reducer for screen
const authActionReducer = createSlice({
  name: "auth",
  initialState: initiaStateValue,
  reducers: {
    changeScreen: (state, action) => {
      state.screenName = action.payload;
    },
  },
});

// pass change screen reducer to action
export const { changeScreen } = authActionReducer.actions;

export default authActionReducer.reducer;
