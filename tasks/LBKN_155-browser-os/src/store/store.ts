import { configureStore } from '@reduxjs/toolkit';
import windowReducer from './slices/windowSlice';
import taskbarReducer from './slices/taskbarSlice';
import clockReducer from './slices/clockSlice';

export const store = configureStore({
  reducer: {
    windows: windowReducer,
    taskbar: taskbarReducer,
    clock: clockReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
