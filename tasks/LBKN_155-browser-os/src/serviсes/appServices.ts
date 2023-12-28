import { store } from '@/store/store';
import { getAppByShortcutId } from '@/serviсes/shortcutService';
import { openApp, closeApp } from '@/store/slices/taskbarSlice';
import { closeWindow, openWindow, toggleMinimizeWindow, focusWindow } from '@/store/slices/windowSlice';
import { IShortcut } from '@/types/IShortcut';
import { IApp } from '@/types/IApp';

const dispatch = store.dispatch;

export const openShortcutService = (action: IShortcut['id']) => {
  const openedApps = store.getState().taskbar.openedApps;
  const isSelectedAppOpen = openedApps.some((app) => app.id === action);

  if (isSelectedAppOpen) {
    dispatch(toggleMinimizeWindow({ id: action }));
    dispatch(focusWindow({ id: action }));
  } else {
    const app = getAppByShortcutId(action);
    dispatch(openApp({ id: action }));
    dispatch(openWindow(app));
  }
};

export const openAppService = (action: IApp) => {
  dispatch(openApp(action));
  dispatch(openWindow(action));
};

export const closeAppService = (action: {id: IApp['id']}) => {
  dispatch(closeApp(action));
  dispatch(closeWindow(action));
};
