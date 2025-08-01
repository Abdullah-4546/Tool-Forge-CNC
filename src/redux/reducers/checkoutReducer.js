import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shippingInfo: JSON.parse(localStorage.getItem('shippingInfo')) || {
    fullName: '',
    address: '',
    city: '',
    country: '',
    postalCode: ''
  },
  paymentMethod: localStorage.getItem('paymentMethod') || 'COD'
};

const checkoutReducer = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      localStorage.setItem('shippingInfo', JSON.stringify(action.payload));
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('paymentMethod', action.payload);
    }
  }
});

export const { setShippingInfo, setPaymentMethod } = checkoutReducer.actions;
export default checkoutReducer.reducer;
