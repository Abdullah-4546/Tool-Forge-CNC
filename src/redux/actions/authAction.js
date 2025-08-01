import { createAsyncThunk } from "@reduxjs/toolkit";
import https from "../../utils/axiosInstance";

export const consumerSignup = createAsyncThunk('auth/consumerSignup', async (credentials) => {
    try {
        const response = await https.post('/register', credentials);

        const consumer = response.data;

        return consumer;
    } catch (error) {
        throw error?.response?.data?.message;;
    }
})

export const ForgetPassword = createAsyncThunk('auth/ForgetPassword', async (credentials) => {
    try {
        const response = await https.post('/ForgetPassword', credentials);

        const ForgetPassword = response.data;

        return ForgetPassword;
    } catch (error) {
        throw error?.response?.data?.message;;
    }
})

export const sendResetCode = createAsyncThunk('auth/sendResetCode', async ({ email }) => {
    try {
      const response = await https.post('/send-reset-code', { email });
      return response.data;
    } catch (error) {
      throw error?.response?.data?.message;
    }
  });
  
  export const verifyResetCodeAndUpdatePassword = createAsyncThunk(
    'auth/verifyResetCodeAndUpdatePassword',
    async ({email, resetCode, newPassword, confirmNewPassword }) => {
      try {
        const response = await https.post('/verify-reset-code', { email, resetCode, newPassword, confirmNewPassword });
        return response.data;
      } catch (error) {
        throw error?.response?.data?.message;
      }
    }
  );
    

export const sellerSignup = createAsyncThunk('auth/sellerSignup', async (credentials) => {
    try {
        const response = await https.post('/seller-register', credentials);

        const seller = response.data;

        return seller;
    } catch (error) {
        throw error?.response?.data?.message;
    }
})

export const sendContactUsEmail = createAsyncThunk(
    'auth/sendContactUsEmail ',
    async (formData, { rejectWithValue }) => {
      try {
        const response = await https.post('/contactUs', formData);
        return response.data; 
      } catch (error) {
        return rejectWithValue(error?.response?.data?.message || 'Failed to send email');
      }
    }
  )

export const sellerVerficationEmail = createAsyncThunk(
    'auth/sellerVerficationEmail',
    async (token) => {
      try {
        const response = await https.get(`/verify-email?token=${token}`);
        return response.data;
      } catch (error) {
        throw error?.response?.data?.message;
      }
    }
  );
  

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials) => {
    try {
        const response = await https.post('/login', credentials);

        const user = response.data;
        localStorage.setItem('accessToken', user.accessToken)
        localStorage.setItem('refreshToken', user.refreshToken)
        return user;
    } catch (error) {
        throw error?.response?.data?.message;;
    }
})



export const fetchProfile = createAsyncThunk('auth/fetchProfile', async () => {
    try {
        const response = await https.get('/me');
        const user = response?.data;
        return user;
    } catch (error) {
        throw error?.response?.data?.message;
    }
});


export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
    try {
        // Make a GET request to your logout endpoint
        const response = await https.get('/logout');

        
        return response?.data;
    } catch (error) {
        throw error?.response?.data?.message;
    }
});


export const getTheAdminAnalytics = createAsyncThunk('auth/getTheAdminAnalytics', async () => {
    try {
        // Make a GET request to your logout endpoint
        const response = await https.get('/admin/analytics');

        
        return response?.data;
    } catch (error) {
        throw error?.response?.data?.message;
    }
});


export const AdminGetAllUsers = createAsyncThunk('auth/AdminGetAllUsers', async () => {
    try {
        // Make a GET request to your logout endpoint
        const response = await https.get('/users');

        
        return response?.data;
    } catch (error) {
        throw error?.response?.data?.message;
    }
});


export const getBannedSellers = createAsyncThunk('auth/AdminGetAllBannedSellers', async () => {
    try {
        const response = await https.get('/banned-sellers');
        return response?.data;
    } catch (error) {
        throw error?.response?.data?.message;
    }
});



