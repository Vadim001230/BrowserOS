import { createSlice } from '@reduxjs/toolkit';
import { IApp } from '@/types/IApp';
import { AppsListConfig } from '@/components/Apps/appsConfig';

const windowSlice = createSlice({
  name: 'taskbar',
  initialState: {
    taskbarApps: {
      favoritApps: AppsListConfig as IApp[],
      openedApps: [] as IApp[],
    }
  },
  reducers: {
    openApp: (state, action) => {
      const isAppOpen = state.taskbarApps.openedApps.some((app) => app.id === action.payload.id);
      if (!isAppOpen) {
        state.taskbarApps.openedApps.push(action.payload);
      }
    },

    closeApp: (state, action) => {
      state.taskbarApps.openedApps = state.taskbarApps.openedApps.filter((app) => app.id !== action.payload.id);
    },
    
    toggleAppToFavorits: (state, action) => {
      const isSelectedAppInFavorit = state.taskbarApps.favoritApps.some((app) => app.id === action.payload.id);
      
      if (isSelectedAppInFavorit) {
        state.taskbarApps.favoritApps = state.taskbarApps.favoritApps.filter((app) => app.id !== action.payload.id);
      } else {
        const selectedAppInOpen = state.taskbarApps.openedApps.find((app) => app.id === action.payload.id)!;
        state.taskbarApps.favoritApps.push(selectedAppInOpen);
      }
    },
  },
});

export const { openApp, closeApp, toggleAppToFavorits } = windowSlice.actions;
export default windowSlice.reducer;
