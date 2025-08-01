import { createAsyncThunk } from "@reduxjs/toolkit";
import https from "../../utils/axiosInstance";

export const createSellerProduct = createAsyncThunk('product/createSellerProduct', async (formData) => {
    try {
        const response = await https.post('/product/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
              }
        });

        return response.data;
    } catch (error) {
        throw error?.response?.data?.message;;
    }
})

export const editSellerProduct = createAsyncThunk(
    'product/editSellerProduct',
    async ({ id, formData }) => { // Pass id and formData as an object
      try {
        const response = await https.put(`/product/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
        return response.data;
      } catch (error) {
        throw error?.response?.data?.message;
      }
    }
  );

export const productGetById = createAsyncThunk('product/productGetById', async (id) => {
    try {
        const response = await https.get(`/product/${id}`);

        return response.data;
    } catch (error) {
        throw error?.response?.data?.message;;
    }
})


export const sellerDeleteProductById = createAsyncThunk('product/sellerDeleteProductById', async (id) => {
    try {
        const response = await https.delete(`/product/${id}`);

        return response.data;
    } catch (error) {
        throw error?.response?.data?.message;;
    }
})

export const AdminGetAllProduct = createAsyncThunk('product/AdminGetAllProduct', async () => {
  try {
      const response = await https.get(`/product`);

      return response.data;
  } catch (error) {
      throw error?.response?.data?.message;;
  }
})

export const AdminDeleteProductById = createAsyncThunk('product/AdminDeleteProductById', async (id) => {
  try {
      const response = await https.delete(`/product/${id}`);

      return response.data;
  } catch (error) {
      throw error?.response?.data?.message;;
  }
})

export const getAllProducts = createAsyncThunk('product/getAllProducts', async () => {
  try {
      const response = await https.get(`/product`);

      return response.data;
  } catch (error) {
      throw error?.response?.data?.message;;
  }
})

export const createProductReview = createAsyncThunk('product/createProductReview', async ({ id, reviewData }) => {
  try {
      const response = await https.put(`/product/${id}/review`, reviewData);
      return response.data;
  } catch (error) {
      throw error?.response?.data?.message;
  }
})

export const getAllProductsByCategoryBased = createAsyncThunk('product/getAllProductsByCategoryBased', async (categoryId) => {
  try {
      const response = await https.get(`/products/category/${categoryId}`);
      return response.data;
  } catch (error) {
      throw error?.response?.data?.message;
  }
})