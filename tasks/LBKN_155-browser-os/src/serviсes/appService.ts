import { store } from '@/store/store';
import { openApp, closeApp } from '@/store/slices/taskbarSlice';
import { closeWindow, openWindow } from '@/store/slices/windowSlice';
import { IApp } from '@/types/IApp';

export const appService = {
  open: (app: IApp) => {
    store.dispatch(openApp(app));
    store.dispatch(openWindow(app));
  },

  close: (id: IApp['id']) => {
    store.dispatch(closeApp({ id }));
    store.dispatch(closeWindow({ id }));
  },
};
