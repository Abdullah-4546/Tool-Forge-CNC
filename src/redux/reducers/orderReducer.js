import { createSlice } from "@reduxjs/toolkit";
import { adminGetAllOrdersAction, createOrder, getUserOrderDetails, updateOrderStatus } from "../actions/orderAction";

const initialState = {
  loading: false,
  error: null,
  message: null,
  data: [],
};

const ordersReducer = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // update the order status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      // Handling the createOrder action
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.stripeCheckoutSession = action.payload.stripeCheckoutSession;
        localStorage.removeItem("cartItems");
        // localStorage.removeItem("shippingInfo");
        localStorage.removeItem("paymentMethod");
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      // get the user order details
      .addCase(getUserOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        
    
      })
      .addCase(getUserOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      // get the user order details
      .addCase(adminGetAllOrdersAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminGetAllOrdersAction.fulfilled, (state, action) => {
        state.loading = false;
        state.adminOrdersData = action.payload.adminOrdersData;
        
    
      })
      .addCase(adminGetAllOrdersAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
  },
});

export const { clearError, clearMessage } = ordersReducer.actions;
export default ordersReducer.reducer;
