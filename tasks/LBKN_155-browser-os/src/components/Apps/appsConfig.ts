import { IApp } from '@/types/IApp';
import { Calculator } from './Calculator/Calculator';
import { Weather } from './Weather/Weather';
import { Notebook } from './Notebook/Notebook';

export const AppsContent = {
  Calculator,
  Weather,
  Notebook
};

const calculator = {
  id: 1,
  name: 'Calculator',
  width: 250,
  height: 400,
  iconURL: 'https://img.icons8.com/fluency/48/calculator.png',
} as IApp;

const notebook = {
  id: 2,
  name: 'Notebook',
  iconURL: 'https://img.icons8.com/fluency/48/spiral-bound-booklet.png',
} as IApp;

const weather = {
  id: 3,
  name: 'Weather',
  iconURL: 'https://img.icons8.com/fluency/48/weather.png',
} as IApp;

export const AppsListConfig = [calculator, notebook, weather] as IApp[];