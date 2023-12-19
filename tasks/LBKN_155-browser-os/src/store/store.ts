import { configureStore } from '@reduxjs/toolkit';
import windowReducer from './slices/windowSlice';
import taskbarReducer from './slices/taskbarSlice';
import clockReducer from './slices/clockSlice';
import appsSlice from './slices/appsSlice';
import brightnessSlice from './slices/brightnessSlice';

export const store = configureStore({
  reducer: {
    apps: appsSlice,
    windows: windowReducer,
    taskbar: taskbarReducer,
    clock: clockReducer,
    brightness: brightnessSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
