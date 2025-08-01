import { createSlice } from "@reduxjs/toolkit";
import {
  AdminGetAllUsers,
  consumerSignup,
  fetchProfile,
  getTheAdminAnalytics,
  loginUser,
  logoutUser,
  sellerSignup,
  sellerVerficationEmail,
  sendResetCode,
  verifyResetCodeAndUpdatePassword,
  getBannedSellers,
  sendContactUsEmail,


} from "../actions/authAction";

const initialState = {
  loading: false,
  error: null,
  message: null,
  loginMessage: null,
  sellerRegMessage: null,
  consumerRegMessage: null,
  loginErr: null,
  sellerRegErr: null,
  isAuthenticated: false,
  user: null,
  bannedSellers: [],

};

const consumerAuth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
    clearLoginMessage: (state) => {
      state.loginMessage = null;
    },
    clearSellerRegMessage: (state) => {
      state.sellerRegMessage = null;
    },
    clearConsumerRegMessage: (state) => {
      state.consumerRegMessage = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearLoginErr: (state) => {
      state.loginErr = null;
    },
    clearSellerRegErr: (state) => {
      state.sellerRegErr = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // for consumer signup
      .addCase(consumerSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(consumerSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.consumerRegMessage = action.payload.message;
      })
      .addCase(consumerSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      //for send rest  code 
      .addCase(sendResetCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendResetCode.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(sendResetCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Ensure you're extracting the message from action.error
      })

        // for user verify Password 
      .addCase(verifyResetCodeAndUpdatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyResetCodeAndUpdatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(verifyResetCodeAndUpdatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Ensure you're extracting the message from action.error
      })

      // for Seller signup
      .addCase(sellerSignup.pending, (state) => {
        state.loading = true;
        state.sellerRegErr = null;
      })
      .addCase(sellerSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.sellerRegMessage = action.payload.message;
      })
      .addCase(sellerSignup.rejected, (state, action) => {
        state.loading = false;
        state.sellerRegErr = action.error;
      })

      //send contact us email
      .addCase(sendContactUsEmail.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(sendContactUsEmail.fulfilled, (state, action) => {
        console.log( "action.payload:",action.payload)
        state.loading = false;
        state.message = action.payload.message; 
        state.error = null; 
      })
      .addCase(sendContactUsEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })


      // seller verification email

      .addCase(sellerVerficationEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sellerVerficationEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(sellerVerficationEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      // for login user

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.loginErr = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.loginMessage = action.payload.message;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.loginErr = action.error;
      })

      // for getting for profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      // for logout function
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.isAuthenticated = false;
        state.user = null;
        localStorage.removeItem("user"); // Assuming 'user' is the key under which user data is stored
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      // admin analytics
      .addCase(getTheAdminAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTheAdminAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.totalProducts = action.payload.totalProducts;
        state.totalUsers = action.payload.totalUsers;
        state.totalCategories = action.payload.totalCategories;
        state.totalBannedSellers = action.payload.totalBannedSellers;
      })
      .addCase(getTheAdminAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      // admin get all users

      .addCase(AdminGetAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(AdminGetAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.data;
      })
      .addCase(AdminGetAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      //admin get all banned sellers

      .addCase(getBannedSellers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBannedSellers.fulfilled, (state, action) => {
        state.loading = false;
        state.bannedSellers = action.payload.bannedSellers;
  console.log("bannedSellers in reducer:",state.bannedSellers)

      })
      .addCase(getBannedSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      
  },
});

export const { clearError, clearMessage, clearLoginMessage ,clearSellerRegMessage, clearConsumerRegMessage, clearLoginErr, clearSellerRegErr} = consumerAuth.actions;
export default consumerAuth.reducer;
