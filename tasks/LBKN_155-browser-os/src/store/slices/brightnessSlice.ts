import { createSlice } from '@reduxjs/toolkit';

const brightnessSlice = createSlice({
  name: 'brightness',
  initialState: 1,
  reducers: {
    setBrightness: (state, action) => state = action.payload,
  },
});

export const { setBrightness } = brightnessSlice.actions;
export default brightnessSlice.reducer;
