import { createSlice } from '@reduxjs/toolkit';
import { IApp } from '@/types/IApp';
import { Weather } from '@/components/Apps/Weather/Weather';
// import { Calculator } from '@/components/Apps/Calculator/Calculator';
// import { Notebook } from '@/components/Apps/Notebook/Notebook';

const explore = {
  id: 1,
  name: 'Проводник',
  component: 'Проводник',
  isFocused: true,
  iconURL: 'https://img.icons8.com/fluency/48/windows-explorer.png',
};

const calculator = {
  id: 2,
  name: 'Калькулятор',
  isFullscreen: false,
  width: 250,
  height: 400,
  isFocused: true,
  children: 'Калькулятор',
  // component: Calculator,
  iconURL: 'https://img.icons8.com/fluency/48/calculator.png',
};

const notebook = {
  id: 3,
  name: 'Блокнот',
  isFullscreen: false,
  width: 500,
  height: 400,
  isFocused: true,
  // children: <Notebook />,
  component: 'Блокнот',
  iconURL: 'https://img.icons8.com/fluency/48/spiral-bound-booklet.png',
};

const weather = {
  id: 4,
  name: 'Погода',
  isFullscreen: false,
  width: 500,
  height: 400,
  isFocused: true,
  component: Weather,
  // children: 'Погода',
  iconURL: 'https://img.icons8.com/fluency/48/weather.png',
};

export const appsList = [explore, calculator, notebook, weather];

const appsSlice = createSlice({
  name: 'apps',
  initialState: {
    apps: appsList as IApp[],
  },
  reducers: {
    createApp: (state, action) => {
      state.apps.push(action.payload);
    },
  },
});

export const { createApp } = appsSlice.actions;
export default appsSlice.reducer;
