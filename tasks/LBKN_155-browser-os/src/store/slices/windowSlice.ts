import { createSlice } from '@reduxjs/toolkit';
import { IWindowManager } from '@/components/WindowManager/WindowManager';

const windowSlice = createSlice({
  name: 'windows',
  initialState: {
    windows: <IWindowManager[]>[],
  },
  reducers: {
    openWindow: (state, action) => {
      state.windows.push({
        id: +new Date(),
        isMinimized: false,
        isFullscreen: true,
        children: action.payload,
        zIndex: 1,
      });
    },

    closeWindow: (state, action) => {
      state.windows = state.windows.filter((window) => window.id !== action.payload.id);
    },

    toggleMinimizeWindow: (state, action) => {
      const currentWindow = state.windows.find((window) => window.id === action.payload.id)!;
      currentWindow.isMinimized = !currentWindow.isMinimized;
    },

    setFullscreenWindow: (state, action) => {
      const currentWindow = state.windows.find((window) => window.id === action.payload.id)!;
      currentWindow.isFullscreen = action.payload.isFullscreen;
    },
  },
});

export const { openWindow, closeWindow, toggleMinimizeWindow, setFullscreenWindow } = windowSlice.actions;
export default windowSlice.reducer;
