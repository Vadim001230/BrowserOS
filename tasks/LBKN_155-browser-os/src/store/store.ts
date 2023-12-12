import { configureStore } from '@reduxjs/toolkit';
import windowReducer from './slices/windowSlice';

export default configureStore({
  reducer: {
    windows: windowReducer,
  },
});
