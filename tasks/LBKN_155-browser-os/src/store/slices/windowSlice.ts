import { createSlice } from '@reduxjs/toolkit';
import { IWindowManager } from '@/components/WindowManager/WindowManager';

const windowSlice = createSlice({
  name: 'windows',
  initialState: {
    windows: <IWindowManager[]>[],
  },
  reducers: {
    open: (state, action) => {
      state.windows.push({
        id: +new Date(),
        isMinimized: false,
        isFullscreen: true,
        children: action.payload,
      });
    },

    focus: (state, action) => {
      const currentWindowIndex = state.windows.findIndex((window) => window.id === action.payload.id)!;
      if (currentWindowIndex === state.windows.length - 1) return;
      state.windows.push(state.windows[currentWindowIndex]);
      state.windows = state.windows.filter((_, index) => index !== currentWindowIndex);
    },

    close: (state, action) => {
      state.windows = state.windows.filter((window) => window.id !== action.payload.id);
    },

    toggleMinimize: (state, action) => {
      const currentWindow = state.windows.find((window) => window.id === action.payload.id)!;
      currentWindow.isMinimized = !currentWindow.isMinimized;
    },

    setFullscreen: (state, action) => {
      const currentWindow = state.windows.find((window) => window.id === action.payload.id)!;
      currentWindow.isFullscreen = action.payload.isFullscreen;
    },
  },
});

export const {
  open,
  focus,
  close,
  toggleMinimize,
  setFullscreen,
} = windowSlice.actions;

export default windowSlice.reducer;
