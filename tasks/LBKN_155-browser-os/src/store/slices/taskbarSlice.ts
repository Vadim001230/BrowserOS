import { createSlice } from '@reduxjs/toolkit';
import { IApp } from '@/types/IApp';
import { FavoritsAppList } from '@/components/Apps/appsConfig';

const windowSlice = createSlice({
  name: 'taskbar',
  initialState: {
      favoritApps: FavoritsAppList as IApp[],
      openedApps: [] as IApp[],
  },
  reducers: {
    openApp: (state, action) => {
      const isAppOpen = state.openedApps.some((app) => app.id === action.payload.id);
      if (!isAppOpen) {
        state.openedApps.push(action.payload);
      }
    },

    closeApp: (state, action) => {
      state.openedApps = state.openedApps.filter((app) => app.id !== action.payload.id);
    },
    
    toggleAppToFavorits: (state, action) => {
      const isSelectedAppInFavorit = state.favoritApps.some((app) => app.id === action.payload.id);
      
      if (isSelectedAppInFavorit) {
        state.favoritApps = state.favoritApps.filter((app) => app.id !== action.payload.id);
      } else {
        const selectedAppInOpen = state.openedApps.find((app) => app.id === action.payload.id)!;
        state.favoritApps.push(selectedAppInOpen);
      }
    },
  },
});

export const { openApp, closeApp, toggleAppToFavorits } = windowSlice.actions;
export default windowSlice.reducer;
