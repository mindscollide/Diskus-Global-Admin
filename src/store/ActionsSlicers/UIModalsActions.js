// modalSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    ModalIsOpen: (state, { payload }) => {
      console.log(payload, "payloadpayloadpayload");
      state.showModal = payload;
    },
  },
});

export const { ModalIsOpen } = modalSlice.actions;

// export const selectShowModal = (state) => state.modal.showModal;

export default modalSlice.reducer;
