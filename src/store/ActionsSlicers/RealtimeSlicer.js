import { createSlice } from "@reduxjs/toolkit";

const realtimeSlice = createSlice({
  name: "realtime",
  initialState: {
    connectionClient: null,
  },
  reducers: {
    setClient: (state, action) => {
      state.connectionClient = action.payload;
    },
  },
});

export const { setClient } = realtimeSlice.actions;

export default realtimeSlice.reducer;
