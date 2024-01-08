import { IApp } from '@/types/IApp';
import { IShortcut } from '@/types/IShortcut';
import { createTreeFromArrayOfPaths } from '@/utils/tree';
import { Calculator } from './Calculator/Calculator';
import { Weather } from './Weather/Weather';
import { Notebook } from './Notebook/Notebook';
import { FileExplorer } from './FileExplorer/FileExplorer';

interface AppsContent {
  [appName: string]: () => JSX.Element;
}

const calculator = {
  id: 1,
  name: 'Calculator',
  title: 'Калькулятор',
  width: 300,
  height: 400,
  iconURL: 'https://img.icons8.com/fluency/48/calculator.png',
  path: 'apps/system/Calculator',
  type: 'app',
};

const notebook = {
  id: 2,
  name: 'Notebook',
  title: 'Блокнот',
  iconURL: 'https://img.icons8.com/fluency/48/spiral-bound-booklet.png',
  path: 'apps/system/Notebook',
  type: 'app',
};

const weather = {
  id: 3,
  name: 'Weather',
  title: 'Погода',
  iconURL: 'https://img.icons8.com/fluency/48/weather.png',
  path: 'apps/Weather',
  type: 'app',
};

const fileExplorer = {
  id: 4,
  name: 'FileExplorer',
  title: 'Проводник',
  iconURL: 'https://img.icons8.com/fluency/48/windows-explorer.png',
  path: 'folder/FileExplorer',
  type: 'app',
};


export const AppsContent: AppsContent = {
  Calculator,
  Weather,
  Notebook,
  FileExplorer,
};

export const AppsListConfig = [calculator, notebook, weather, fileExplorer] as IApp[];

export const ShortcutsList = [{ id: calculator.id }, { id: notebook.id }, { id: weather.id }, { id: fileExplorer.id }] as IShortcut[];

export const FavoritsAppList = [{ id: fileExplorer.id }] as IShortcut[];

export const systemTree = createTreeFromArrayOfPaths(AppsListConfig);

export const weatherApiKey = '228478b7106e0d3eb8311cb24df1323b';
