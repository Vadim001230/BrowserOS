import { createSlice } from '@reduxjs/toolkit';

interface Clock {
  time: string;
  date: string;
}

const clockSlice = createSlice({
  name: 'clock',
  initialState: {
    currentDateTime: {
      time: '00:00',
      date: '01.01.2024',
    } as Clock,
  },
  reducers: {
    setCurrentDateTime: (state, action) => {
      state.currentDateTime = action.payload;
    },
  },
});

export const { setCurrentDateTime } = clockSlice.actions;
export default clockSlice.reducer;
