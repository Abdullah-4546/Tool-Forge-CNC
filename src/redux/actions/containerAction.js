import { createAsyncThunk } from "@reduxjs/toolkit";
import https from "../../utils/axiosInstance";


// Create a new bidding container
export const createBiddingContainer = createAsyncThunk('container/createBiddingContainer', async (formData) => {
  try {
    const response = await https.post('/container/create', formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const containerGetById = createAsyncThunk('container/containerGetById', async (id) => {
  try {
      const response = await https.get(`/container/${id}`);
      return response.data;
  } catch (error) {
      throw error?.response?.data?.message;;
  }
})

export const editSellerContainer = createAsyncThunk('container/editSellerContainer', async ({ id, formData }) => {
  try {
    const response = await https.put(`/container/${id}/update`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const sellerDeleteContainerById = createAsyncThunk('container/sellerDeleteContainerById', async (id) => {
  try {
    const response = await https.delete(`/container/${id}/delete`);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const getAllContainers = createAsyncThunk('container/getAllContainers', async () => {
  try {
      const response = await https.get(`/containers`);

      return response.data;
  } catch (error) {
      throw error?.response?.data?.message;;
  }
})

export const placeBid = createAsyncThunk('container/placeBid', async (bidData, { rejectWithValue }) => {
    try {
      const response = await https.post(`/container/${bidData.containerId}/place-bid`, {
        amount: bidData.amount,
      },{
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("Response from server in placeBid in Actions:", response.data);

      return response.data; 
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Failed to place bid");
    }
  }
);

// Fetch bids for a specific container
export const fetchBids = createAsyncThunk( 'container/fetchBids', async (id, { rejectWithValue }) => {
    try {
      const response = await https.get(`/container/${id}/fetch-bids`);
      console.log("Response from server in fetchBids in Actions:", response.data);

      return response.data; 

    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Failed to fetch bids");
    }
  }
);
