import { store } from '@/store/store';
import { IShortcut } from '@/types/IShortcut';
import { IApp } from '@/types/IApp';

export const getAppsByShortcutsList = (shortcutList: IShortcut[]): IApp[] => {
  const appsList = store.getState().apps;

  return appsList.filter((app) => shortcutList.some((shortcut) => shortcut.id === app.id));
};

export const getAppByShortcutId = (id: IShortcut['id']) => {
  const appsList = store.getState().apps;

  return appsList.find((app) => app.id === id) as IApp;
};