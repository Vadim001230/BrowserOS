import { configureStore } from '@reduxjs/toolkit';
import windowReducer from './slices/windowSlice';
import taskbarReducer from './slices/taskbarSlice';

export const store = configureStore({
  reducer: {
    windows: windowReducer,
    taskbar: taskbarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
