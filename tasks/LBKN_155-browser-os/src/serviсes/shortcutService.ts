import { store } from '@/store/store';
import { openApp } from '@/store/slices/taskbarSlice';
import { openWindow, toggleMinimizeWindow, focusWindow } from '@/store/slices/windowSlice';
import { IShortcut } from '@/types/IShortcut';
import { IApp } from '@/types/IApp';

export const shortcutService = {
  getAppByShortcutId: (id: IShortcut['id']) => {
    const appsList = store.getState().apps;
  
    return appsList.find((app) => app.id === id) as IApp;
  },

  getAppsByShortcutsList: (shortcutList: IShortcut[]): IApp[] => {
    const appsList = store.getState().apps;

    return appsList.filter((app) => shortcutList.some((shortcut) => shortcut.id === app.id));
  },

  open: (id: IShortcut['id']) => {
    const openedApps = store.getState().taskbar.openedApps;
    const isSelectedAppOpen = openedApps.some((app) => app.id === id);
  
    if (isSelectedAppOpen) {
      store.dispatch(toggleMinimizeWindow({ id }));
      store.dispatch(focusWindow({ id }));
    } else {
      const app = shortcutService.getAppByShortcutId(id);
      store.dispatch(openApp({ id }));
      store.dispatch(openWindow(app));
    }
  },
};

