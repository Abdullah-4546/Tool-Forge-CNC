import { createAsyncThunk } from "@reduxjs/toolkit";
import https from "../../utils/axiosInstance";

export const fetchCategories = createAsyncThunk('category/fetchCategories', async () => {
    try {
        const response = await https.get('/categories');
        return response?.data;
    } catch (error) {
        throw error?.response?.data?.message;
    }
});

export const createAdminCategories = createAsyncThunk('category/createAdminCategories', async (formData) => {
    try {
        const response = await https.post('/category/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
              }
        });

        return response.data;
    } catch (error) {
        throw error?.response?.data?.message;;
    }
})

export const editAdminCategories = createAsyncThunk('category/editAdminCategories', async ({ id, formData }) => {
    try {
        const response = await https.put( `/category/${id}/update`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
              }
        });

        return response.data;
    } catch (error) {
        throw error?.response?.data?.message;;
    }
})

export const adminCategoryGetById = createAsyncThunk('category/adminCategoryGetById', async (id) => {
    try {
        const response = await https.get( `/category/${id}`);

        return response.data;
    } catch (error) {
        throw error?.response?.data?.message;;
    }
})

export const adminCategorydeleteById = createAsyncThunk('category/adminCategorydeleteById', async (id) => {
    try {
        const response = await https.delete( `/category/${id}/delete`);

        return response.data;
    } catch (error) {
        throw error?.response?.data?.message;;
    }
})