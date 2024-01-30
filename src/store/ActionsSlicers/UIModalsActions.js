// modalSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
  ProceedUserHistoryModal: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    ModalIsOpen: (state, { payload }) => {
      state.showModal = payload;
    },
    ProceedHistoryModalOpen: (state, { payload }) => {
      state.ProceedUserHistoryModal = payload;
    },
  },
});

export const { ModalIsOpen, ProceedHistoryModalOpen } = modalSlice.actions;

// export const selectShowModal = (state) => state.modal.showModal;

export default modalSlice.reducer;
