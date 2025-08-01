import {configureStore} from '@reduxjs/toolkit';

import authReducer from './reducers/authReducer';
import productReducer from './reducers/productReducer';
import categoryReducer from './reducers/categoryReducer';
import profileReducer from './reducers/profileReducer';
import orderReducer from './reducers/orderReducer';
import containerReducer  from './reducers/containerReducer';
import checkoutReducer from './reducers/checkoutReducer';

const initialState = {
    loading: false,
    error: null,
    message: null,
    isAuthenticated: false,
    user: null,
  };
  
  // Function to load the state from localStorage
  const loadState = () => {
    if (typeof window === 'undefined') {
      // Server-side, return initial state
      return initialState;
    }
  
    try {
      const serializedState = localStorage.getItem('user');
      if (serializedState === null) {
        return initialState; // When there is no state in localStorage, return the initial state
      }
      return { ...initialState, user: JSON.parse(serializedState), isAuthenticated: true }; // Parse the JSON string and set it as initial state
    } catch (err) {
      console.error('Error loading state: ', err);
      return initialState; 
    }
  };


export const store = configureStore({
    reducer:{
        auth: authReducer,
        product: productReducer,
        category: categoryReducer,
        profile: profileReducer,
        orders: orderReducer,
        container: containerReducer,
        checkout: checkoutReducer
    },
    preloadedState: {
        auth: loadState(),
      }
})