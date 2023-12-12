import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WindowState {
  id: string;
  isOpen: boolean;
  isMinimized: boolean;
  isFullscreen: boolean;
  width: number;
  height: number;
}

const initialState: WindowState[] = [];

const windowSlice = createSlice({
  name: 'windows',
  initialState,
  reducers: {
    openWindow: (state, action: PayloadAction<string>) => {
      console.log(state, action);

    },

    closeWindow: (state, action: PayloadAction<string>) => {
      console.log(state, action);
    },
    
    minimizeWindow: (state, action: PayloadAction<string>) => {
      console.log(state, action);
    },

  },
});

export const { openWindow, closeWindow, minimizeWindow } = windowSlice.actions;
export default windowSlice.reducer;
