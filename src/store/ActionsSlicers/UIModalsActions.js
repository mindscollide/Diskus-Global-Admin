// modalSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
  ProceedUserHistoryModal: false,
  ChangepasswordModal: false,
  editOrganization: false,
  editSubscriptionModal: false,
  editSubscriptionConfirmationModal: false,
  editOraganizationSubscriptionModal: false,
  editOrganizationConfirmationModal: false,
  openSendInvoiceModal: false,
  openTrialRenewModal: false,
  openSubscriptionModal: false,
  userInfoModal: false,
  ConfirmationInfoModal: false,
  createPackageModal: false,
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
      console.log(payload, "payloadpayloadpayload");
      state.editSubscriptionModal = payload;
    },
    editSubscriptionConfirmationModalOpen: (state, { payload }) => {
      console.log(payload, "payloadpayloadpayload");
      state.editSubscriptionConfirmationModal = payload;
    },
    editOrganizationSubscriptionModalOpen: (state, { payload }) => {
      console.log(payload, "payloadpayloadpayloadsss");
      state.editOraganizationSubscriptionModal = payload;
    },
    editOrganizationConfirmation: (state, { payload }) => {
      console.log(payload, "payloadpayloadpayloadsss");
      state.editOrganizationConfirmationModal = payload;
    },

    // to open send Invoice modal
    dashboardSendInvoiceOpenModal: (state, { payload }) => {
      state.openSendInvoiceModal = payload;
    },

    // to open trialRenew modal
    trialRenewOpenModal: (state, { payload }) => {
      state.openTrialRenewModal = payload;
    },

    //to open subscription modal
    subscriptionRenewOpenModal: (state, { payload }) => {
      state.openSubscriptionModal = payload;
    },

    //to open User Info Modal
    userInfoOpenModal: (state, { payload }) => {
      state.userInfoModal = payload;
    },

    // to open confirmation Modal
    userConifrmationOpenModal: (state, { payload }) => {
      state.ConfirmationInfoModal = payload;
    },

    // to open Create Package Modal
    packageCreateOpenModal: (state, { payload }) => {
      state.createPackageModal = payload;
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
  editOrganizationSubscriptionModalOpen,
  editOrganizationConfirmation,
  dashboardSendInvoiceOpenModal,
  trialRenewOpenModal,
  subscriptionRenewOpenModal,
  userInfoOpenModal,
  userConifrmationOpenModal,
  packageCreateOpenModal,
} = modalSlice.actions;

export default modalSlice.reducer;
