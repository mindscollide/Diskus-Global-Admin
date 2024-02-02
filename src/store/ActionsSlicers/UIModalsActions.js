// modalSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
  ProceedUserHistoryModal: false,
  ChangepasswordModal: false,
  editOrganization: false,
  editSubscriptionModal: false,
  editSubscriptionConfirmationModal: false,
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
    editOrganizationModalOpen: (state, { payload }) => {
      state.editOrganization = payload;
    },
    editSubscriptionModalOpen: (state, { payload }) => {
      state.editSubscriptionModal = payload;
    },
    editSubscriptionConfirmationModalOpen: (state, { payload }) => {
      state.editSubscriptionConfirmationModal = payload;
    },
  },
});

export const {
  ModalIsOpen,
  ProceedHistoryModalOpen,
  ChangePasswordModalOpen,
  editOrganizationModalOpen,
  editSubscriptionModalOpen,
  editSubscriptionConfirmationModalOpen,
} = modalSlice.actions;

export default modalSlice.reducer;
