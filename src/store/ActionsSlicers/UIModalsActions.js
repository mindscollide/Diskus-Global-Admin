// modalSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
  ProceedUserHistoryModal: false,
  ChangepasswordModal: false,
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
    ChangePasswordModalOpen: (state, { payload }) => {
      state.ChangepasswordModal = payload;
    },
  },
});

export const { ModalIsOpen, ProceedHistoryModalOpen, ChangePasswordModalOpen } =
  modalSlice.actions;

export default modalSlice.reducer;
