import { createSlice } from "@reduxjs/toolkit";
import {
  AdminBannedThrSellerAccounts,
  AdminDeleteTheUserAccount,
  AdminUnbanSellerAccount,
  changePassword,
  getTheSellerDetailsById,
  updateSellerProfile,
  updateUserProfile,
} from "../actions/profileAction";

const initialState = {
  loading: false,
  error: null,
  message: null,
  deleteAccountMsg: null,
  editProfileMsg: null,
  deleteAccountErr: null

};

const profileReducer = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
    clearDeleteAccountMsg: (state) => {
      state.deleteAccountMsg = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearEditProfileMsg: (state) => {
      state.editProfileMsg = null;
    },
    clearDeleteAccountErr: (state) => {
      state.deleteAccountErr = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // update seller profile

      .addCase(updateSellerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSellerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.editProfileMsg = action.payload.message;
      })
      .addCase(updateSellerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      // change password

      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      // admin can banned the seller account
      .addCase(AdminBannedThrSellerAccounts.pending, (state) => {
        state.loading = true;
        state.deleteAccountErr = null
      })
      .addCase(AdminBannedThrSellerAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteAccountMsg = action.payload?.message;
      })
      .addCase(AdminBannedThrSellerAccounts.rejected, (state, action) => {
        state.loading = false;
        state.deleteAccountErr = action.error;
      })

      // admin can delete the user account
      .addCase(AdminDeleteTheUserAccount.pending, (state) => {
        state.loading = true;
        state.deleteAccountErr = null
      })
      .addCase(AdminDeleteTheUserAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteAccountMsg = action.payload?.message;
      })
      .addCase(AdminDeleteTheUserAccount.rejected, (state, action) => {
        state.loading = false;
        state.deleteAccountErr = action.error;
      })

      .addCase(getTheSellerDetailsById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTheSellerDetailsById.fulfilled, (state, action) => {
        state.loading = false;
        state.seller = action.payload?.seller;
      })
      .addCase(getTheSellerDetailsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      // user can edit the profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      .addCase(AdminUnbanSellerAccount.pending, (state) => {
        state.loading = true;
        state.deleteAccountErr = null;
      })
      .addCase(AdminUnbanSellerAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteAccountMsg = action.payload?.message;
      })
      .addCase(AdminUnbanSellerAccount.rejected, (state, action) => {
        state.loading = false;
        state.deleteAccountErr = action.error;
      })
  },
});

export const { clearError, clearMessage, clearDeleteAccountMsg, clearDeleteAccountErr, clearEditProfileMsg } = profileReducer.actions;
export default profileReducer.reducer;
