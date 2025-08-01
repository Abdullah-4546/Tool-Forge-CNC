import { createAsyncThunk } from "@reduxjs/toolkit";
import https from "../../utils/axiosInstance";

export const updateSellerProfile = createAsyncThunk(
  "profile/updateSellerProfile",
  async (credentials) => {
    try {
      const response = await https.put("/user/update", credentials);

      return response.data;
    } catch (error) {
      throw error?.response?.data?.message;
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "profile/updateUserProfile",
  async (credentials) => {
    try {
      const response = await https.put("/user/profile/update", credentials);

      return response.data;
    } catch (error) {
      throw error?.response?.data?.message;
    }
  }
);

export const changePassword = createAsyncThunk(
  "profile/changePassword",
  async ({ oldPassword, newPassword, confirmPassword }) => {
    try {
      const response = await https.post("/change-password", {
        oldPassword,
        newPassword,
        confirmPassword,
      });

      return response.data;
    } catch (error) {
      throw error?.response?.data?.message;
    }
  }
);

export const AdminBannedThrSellerAccounts = createAsyncThunk(
  "profile/AdminBannedThrSellerAccounts",
  async (sellerId) => {
    try {
      const response = await https.put(`/ban-seller/${sellerId}`);
      return response?.data;
    } catch (error) {
      throw error?.response?.data?.message;
    }
  }
);

export const AdminDeleteTheUserAccount = createAsyncThunk(
  "profile/AdminDeleteTheUserAccount",
  async (userId) => {
    try {
      const response = await https.delete(`/user/${userId}`);
      return response?.data;
    } catch (error) {
      throw error?.response?.data?.message;
    }
  }
);

export const getTheSellerDetailsById = createAsyncThunk(
  "profile/getTheSellerDetailsById",
  async (id) => {
    try {
      const response = await https.get(`/seller/${id}`);
      return response?.data;
    } catch (error) {
      throw error?.response?.data?.message;
    }
  }
);


export const AdminUnbanSellerAccount = createAsyncThunk(
  "profile/AdminUnbanSellerAccount",
  async (sellerId) => {
    try {
      const response = await https.put(`/unban/${sellerId}/seller`);
      return response?.data;
    } catch (error) {
      throw error?.response?.data?.message;
    }
  }
);
