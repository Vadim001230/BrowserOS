import { createSlice } from '@reduxjs/toolkit';

const battarySettingsSlice = createSlice({
  name: 'battarySettings',
  initialState: {
    brightness: 1,
    isOnSaveBattery: false,
    isOnNightLight: false,
  },
  reducers: {
    setBrightness: (state, action) => {
      state.brightness = action.payload;
    },

    toggleSaveBattery: (state) => {
      state.isOnSaveBattery = !state.isOnSaveBattery;
    },

    toggletNightLight: (state) => {
      state.isOnNightLight = !state.isOnNightLight;
    },
  },
});

export const { setBrightness, toggleSaveBattery, toggletNightLight } = battarySettingsSlice.actions;
export default battarySettingsSlice.reducer;
