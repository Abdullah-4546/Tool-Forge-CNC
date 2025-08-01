import { createAsyncThunk } from "@reduxjs/toolkit";
import https from "../../utils/axiosInstance";

export const updateOrderStatus = createAsyncThunk('orders/updateOrderStatus', async ({orderId, status, products}) => {
    try {
        const response = await https.put(`/orders/${orderId}`, { status, products });

        return response.data;
        
    } catch (error) {
        throw error?.response?.data?.message;;
    }
})

// Action to create an order
export const createOrder = createAsyncThunk('orders/createOrder', async ({ products, totalPrice, shippingInfo, paymentMethod }) => {
    try {
        // Send a request to create an order
        const response = await https.post('/orders/create', { products, totalPrice, shippingInfo, paymentMethod });
        
        return response.data;
        
    } catch (error) {
        throw error?.response?.data?.message;
    }
});


// Action to create an order
export const getUserOrderDetails = createAsyncThunk('orders/getUserOrderDetails', async () => {
    try {
        // Send a request to create an order
        const response = await https.get('/localuserorders');
        
        return response.data;
        
    } catch (error) {
        throw error?.response?.data?.message;
    }
});

// Action to create an order
export const adminGetAllOrdersAction = createAsyncThunk('orders/adminGetAllOrdersAction', async () => {
    try {
        // Send a request to create an order
        const response = await https.get('/admin/orders');
        
        return response.data;
        
    } catch (error) {
        throw error?.response?.data?.message;
    }
});