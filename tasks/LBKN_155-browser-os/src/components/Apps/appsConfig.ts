import { IApp } from '@/types/IApp';
import { transformArrayToTree } from '@/utils/tree';
import { Calculator } from './Calculator/Calculator';
import { Weather } from './Weather/Weather';
import { Notebook } from './Notebook/Notebook';
import { FileExplorer } from './FileExplorer/FileExplorer';

const calculator = {
  id: 1,
  name: 'Calculator',
  width: 250,
  height: 400,
  iconURL: 'https://img.icons8.com/fluency/48/calculator.png',
  path: 'apps/system/Calculator',
} as IApp;

const notebook = {
  id: 2,
  name: 'Notebook',
  iconURL: 'https://img.icons8.com/fluency/48/spiral-bound-booklet.png',
  path: 'apps/system/Notebook',
} as IApp;

const weather = {
  id: 3,
  name: 'Weather',
  iconURL: 'https://img.icons8.com/fluency/48/weather.png',
  path: 'apps/Weather',
} as IApp;

const fileExplorer = {
  id: 4,
  name: 'File Explorer',
  iconURL: 'https://img.icons8.com/fluency/48/windows-explorer.png',
  path: 'apps/File Explorer',
} as IApp;

export const AppsContent = {
  Calculator,
  Weather,
  Notebook,
  'File Explorer': FileExplorer,
};

export const AppsListConfig = [calculator, notebook, weather, fileExplorer] as IApp[];

export const ShortcutsList = [calculator, notebook, weather, fileExplorer];

export const FavoritsAppList = [fileExplorer];

export const treeOfPaths = transformArrayToTree(AppsListConfig);