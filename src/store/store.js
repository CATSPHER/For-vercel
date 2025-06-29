import {configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice';

// store ke andar ek hi parameter aata h i.e. reducer
const store=configureStore({
    reducer:{
        auth : authSlice,
    }
});

export default store;