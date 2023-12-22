import { createSlice } from '@reduxjs/toolkit';

const batterySettingsSlice = createSlice({
  name: 'batterySettings',
  initialState: {
    brightness: 1,
    isSaveBatteryOn: false,
    isNightLightOn: false,
  },
  reducers: {
    setBrightness: (state, action) => {
      state.brightness = action.payload;
    },

    toggleSaveBattery: (state) => {
      state.isSaveBatteryOn = !state.isSaveBatteryOn;
    },

    toggletNightLight: (state) => {
      state.isNightLightOn = !state.isNightLightOn;
    },
  },
});

export const { setBrightness, toggleSaveBattery, toggletNightLight } = batterySettingsSlice.actions;
export default batterySettingsSlice.reducer;
