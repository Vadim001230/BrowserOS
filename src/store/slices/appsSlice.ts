import { createSlice } from '@reduxjs/toolkit';
import { IApp } from '@/types/IApp';
import { AppsListConfig } from '@/components/Apps/appsConfig';

const appsSlice = createSlice({
  name: 'apps',
  initialState: AppsListConfig as IApp[],

  reducers: {
    createApp: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { createApp } = appsSlice.actions;
export default appsSlice.reducer;
