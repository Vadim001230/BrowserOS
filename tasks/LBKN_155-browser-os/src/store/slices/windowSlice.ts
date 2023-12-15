import { createSlice } from '@reduxjs/toolkit';
import { IWindowManager } from '@/components/WindowManager/WindowManager';

const windowSlice = createSlice({
  name: 'windows',
  initialState: {
    windows: <IWindowManager[]>[],
  },
  reducers: {
    openWindow: (state, action) => {
      state.windows.push(action.payload);
    },

    focusWindow: (state, action) => {
      const currentWindowIndex = state.windows.findIndex((window) => window.id === action.payload.id)!;
      if (currentWindowIndex === state.windows.length - 1) return;
      state.windows = state.windows.map((window, index) => ({
        ...window,
        isFocused: index === currentWindowIndex,
      }));
      
      state.windows.push(state.windows[currentWindowIndex]);
      state.windows = state.windows.filter((_, index) => index !== currentWindowIndex);
    },

    closeWindow: (state, action) => {
      state.windows = state.windows.filter((window) => window.id !== action.payload.id);
    },

    toggleMinimizeWindow: (state, action) => {
      // const currentWindowIndex = state.windows.findIndex((window) => window.id === action.payload.id)!;
      const currentWindow = state.windows.find((window) => window.id === action.payload.id)!;
      currentWindow.isMinimized = !currentWindow.isMinimized;
      // if (currentWindow.isMinimized && state.windows[currentWindowIndex - 1]) {
      //   state.windows[currentWindowIndex - 1].isFocused = true;
      //   state.windows[currentWindowIndex].isFocused = false;
      // }
    },

    setWindowFullscreen: (state, action) => {
      const currentWindow = state.windows.find((window) => window.id === action.payload.id)!;
      currentWindow.isFullscreen = action.payload.isFullscreen;
    },

    setWindowWidth: (state, action) => {
      const currentWindow = state.windows.find((window) => window.id === action.payload.id)!;
      currentWindow.width = action.payload.width;
    },

    setWindowHeight: (state, action) => {
      const currentWindow = state.windows.find((window) => window.id === action.payload.id)!;
      currentWindow.height = action.payload.height;
    },

    setWindowCoords: (state, action) => {
      const currentWindow = state.windows.find((window) => window.id === action.payload.id)!;
      currentWindow.coords = { ...currentWindow.coords , ...action.payload.coords};
    },
  },
});

export const {
  openWindow,
  focusWindow,
  closeWindow,
  toggleMinimizeWindow,
  setWindowFullscreen,
  setWindowWidth,
  setWindowHeight,
  setWindowCoords,
} = windowSlice.actions;

export default windowSlice.reducer;
