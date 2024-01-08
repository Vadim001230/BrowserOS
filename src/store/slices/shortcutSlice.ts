import { createSlice } from '@reduxjs/toolkit';
import { IApp } from '@/types/IApp';
import { ShortcutsList } from '@/components/Apps/appsConfig';

const shortcutSlice = createSlice({
  name: 'shortcuts',
  initialState: ShortcutsList as IApp[],

  reducers: {
    addShortcut: (state, action) => {
      state.push(action.payload);
    },

    deleteShortcut: (state, action) => {
      return state = state.filter((app) => app.id !== action.payload.id);
    },
  },
});

export const { addShortcut, deleteShortcut } = shortcutSlice.actions;
export default shortcutSlice.reducer;
