import { store } from '@/store/store';
import { openApp, closeApp } from '@/store/slices/taskbarSlice';
import { closeWindow, openWindow, toggleMinimizeWindow, focusWindow } from '@/store/slices/windowSlice';
import { IShortcut } from '@/types/IShortcut';
import { IApp } from '@/types/IApp';

const dispatch = store.dispatch;

export const getAppsByShortcutsList = (shortcutList: IShortcut[]): IApp[] => {
  const appsList = store.getState().apps;

  return appsList.filter((app) => shortcutList.some((shortcut) => shortcut.id === app.id));
};

export const getAppById = (id: IApp['id']) => {
  const appsList = store.getState().apps;

  return appsList.find((app) => app.id === id) as IApp;
};

export const openShortcutService = (action: IShortcut['id']) => {
  const openedApps = store.getState().taskbar.openedApps;
  const isSelectedAppOpen = openedApps.some((app) => app.id === action);

  if (isSelectedAppOpen) {
    dispatch(toggleMinimizeWindow({ id: action }));
    dispatch(focusWindow({ id: action }));
  } else {
    const app = getAppById(action);
    dispatch(openApp({ id: action }));
    dispatch(openWindow(app));
  }
};

export const openAppService = (action: IApp) => {
  dispatch(openApp(action));
  dispatch(openWindow(action));
};

export const closeAppService = (action: unknown) => {
  dispatch(closeApp(action));
  dispatch(closeWindow(action));
};

export const toggleMinimizeAppService = (action: unknown) => {
  dispatch(toggleMinimizeWindow(action));
};

export const focusAppService = (action: unknown) => {
  dispatch(focusWindow(action));
};
