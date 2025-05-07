import { createSlice } from "@reduxjs/toolkit";
import {
  EditOrganizationAPI,
  EditSubscriptionAPI,
  getAllOrganizationApi,
  getAllTrailRejectedApi,
  getAllTrailRequestedApi,
  searchOrganizationApi,
  updateOrganizationTrailRequestStatusApi,
  validateEncryptedStringForOrganizationTrialEmailApi,
} from "../Actions/ViewOrganizationActions";

const initialState = {
  loading: false,
  searchOrganizationData: null,
  trailRequestData: null,
  rejectedRequestData: null,
  editSubscriptionData: null,
  editOrganizationData: null,
  getAllOrganizationData: [],
  updateOrganizationTrailRequest: null,
  validateEncryptedStringForOrganizationTrialEmail: null,
  confirmationModal: false,
  Responsemessage: "",
};

const searchOrganization = createSlice({
  name: "searchOrganization",
  initialState,
  reducers: {
    viewOrganizationLoader: (state, { payload }) => {
      state.loading = payload;
    },
    confirmatioModalFunc: (state, { payload }) => {
      state.confirmationModal = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchOrganizationApi.pending, (state) => {
        // state.loading = true;
      })
      .addCase(searchOrganizationApi.fulfilled, (state, action) => {
        state.searchOrganizationData = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(searchOrganizationApi.rejected, (state, action) => {
        state.searchOrganizationData = null;
        state.Responsemessage = action.payload || "";
      })

      .addCase(EditSubscriptionAPI.pending, (state) => {
        // state.loading = true;
      })

      .addCase(EditSubscriptionAPI.fulfilled, (state, action) => {
        state.Responsemessage = action.payload.code || "";
        state.editSubscriptionData = action.payload;
      })

      .addCase(EditSubscriptionAPI.rejected, (state, action) => {
        state.editSubscriptionData = null;
        state.Responsemessage = action.payload || "";
      })

      .addCase(EditOrganizationAPI.pending, (state) => {
        // state.loading = true;
      })

      .addCase(EditOrganizationAPI.fulfilled, (state, action) => {
        console.log("addPackageFeatureApiaddPackageFeatureApi", action);

        state.Responsemessage = action.payload.code || "";
        state.editOrganizationData = action.payload;
      })

      .addCase(EditOrganizationAPI.rejected, (state, action) => {
        state.editOrganizationData = null;
        state.Responsemessage = action.payload || "";
      })

      .addCase(getAllOrganizationApi.pending, (state) => {})
      .addCase(getAllOrganizationApi.fulfilled, (state, action) => {
        state.getAllOrganizationData = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(getAllOrganizationApi.rejected, (state, action) => {
        state.Responsemessage = action.payload || "";
      })

      .addCase(getAllTrailRejectedApi.fulfilled, (state, action) => {
        state.rejectedRequestData = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(getAllTrailRejectedApi.rejected, (state, action) => {
        state.rejectedRequestData = null;
        state.Responsemessage = action.payload || "";
      })
      .addCase(getAllTrailRequestedApi.fulfilled, (state, action) => {
        state.trailRequestData = action.payload;
        state.Responsemessage = "Success";
      })
      .addCase(getAllTrailRequestedApi.rejected, (state, action) => {
        state.trailRequestData = null;
        state.Responsemessage = action.payload || "";
      })
      .addCase(
        updateOrganizationTrailRequestStatusApi.fulfilled,
        (state, action) => {
          state.updateOrganizationTrailRequest = action.payload;
          state.Responsemessage = action.payload.message;
        }
      )
      .addCase(
        updateOrganizationTrailRequestStatusApi.rejected,
        (state, action) => {
          state.updateOrganizationTrailRequest = null;
          state.Responsemessage = action.payload;
        }
      )
      .addCase(
        validateEncryptedStringForOrganizationTrialEmailApi.fulfilled,
        (state, action) => {
          state.validateEncryptedStringForOrganizationTrialEmail =
            action.payload;
          state.Responsemessage = "Success";
        }
      )
      .addCase(
        validateEncryptedStringForOrganizationTrialEmailApi.rejected,
        (state, action) => {
          state.validateEncryptedStringForOrganizationTrialEmail = null;
          state.Responsemessage = action.payload;
        }
      );
  },
});

export const { viewOrganizationLoader, confirmatioModalFunc } =
  searchOrganization.actions;
export default searchOrganization.reducer;
