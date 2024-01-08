import { configureStore } from '@reduxjs/toolkit';
import windowReducer from './slices/windowSlice';
import taskbarReducer from './slices/taskbarSlice';
import appsReducer from './slices/appsSlice';
import shortcutReducer from './slices/shortcutSlice';
import batterySettingsReducer from './slices/batterySettingsSlice';

export const store = configureStore({
  reducer: {
    apps: appsReducer,
    windows: windowReducer,
    shortcuts: shortcutReducer,
    taskbar: taskbarReducer,
    batterySettings: batterySettingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
