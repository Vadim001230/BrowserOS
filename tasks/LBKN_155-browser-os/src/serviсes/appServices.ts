import { UnknownAction, Dispatch } from '@reduxjs/toolkit';
import { openApp, closeApp } from '@/store/slices/taskbarSlice';
import { closeWindow, openWindow } from '@/store/slices/windowSlice';

export const openAppService = (dispatch: Dispatch<UnknownAction>, action: unknown) => {
  dispatch(openApp(action));
  dispatch(openWindow(action));
};

export const closeAppService = (dispatch: Dispatch<UnknownAction>, action: unknown) => {
  dispatch(closeApp(action));
  dispatch(closeWindow(action));
};
