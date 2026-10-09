import { configureStore } from '@reduxjs/toolkit';
import handleCart from './handleCart';

const store = configureStore({
  reducer: {
    handleCart,
  },
});

export default store;