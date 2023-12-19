import { createSlice } from '@reduxjs/toolkit';
import { IWindow } from '@/types/IWindow';

const windowSlice = createSlice({
  name: 'windows',
  initialState: {
    windows: [] as IWindow[],
  },
  reducers: {
    openWindow: (state, action) => {
      const isWindowOpen = state.windows.some((window) => window.id === action.payload.id);
      if (!isWindowOpen) {
        state.windows.push(action.payload);
      }
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
      const currentWindow = state.windows.find((window) => window.id === action.payload.id);
      if (currentWindow) {
        currentWindow.isMinimized = !currentWindow.isMinimized;
      }
    },

    setWindowFullscreen: (state, action) => {
      const currentWindow = state.windows.find((window) => window.id === action.payload.id);
      if (currentWindow) {
        currentWindow.isFullscreen = action.payload.isFullscreen;
      }
    },

    setWindowWidth: (state, action) => {
      const currentWindow = state.windows.find((window) => window.id === action.payload.id);
      if (currentWindow) {
        currentWindow.width = action.payload.width;
      }
    },

    setWindowHeight: (state, action) => {
      const currentWindow = state.windows.find((window) => window.id === action.payload.id);
      if (currentWindow) {
        currentWindow.height = action.payload.height;
      }
    },

    setWindowCoords: (state, action) => {
      const currentWindow = state.windows.find((window) => window.id === action.payload.id);
      if (currentWindow) {
        currentWindow.coords = { ...currentWindow.coords , ...action.payload.coords};
      }
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
