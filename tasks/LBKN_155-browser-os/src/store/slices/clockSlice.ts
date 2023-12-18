import { createSlice } from '@reduxjs/toolkit';

interface Clock {
  time: string;
  date: string;
}

const clockSlice = createSlice({
  name: 'clock',
  initialState: {
    currentDateTime: <Clock>{
      time: '00:00',
      date: '01.01.2024',
    },
  },
  reducers: {
    setCurrentDateTime: (state, action) => {
      state.currentDateTime = action.payload;
    },
  },
});

export const { setCurrentDateTime } = clockSlice.actions;
export default clockSlice.reducer;
