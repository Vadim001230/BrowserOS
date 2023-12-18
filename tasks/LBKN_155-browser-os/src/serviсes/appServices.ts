import { Dispatch } from '@reduxjs/toolkit';
import { openApp, closeApp } from '@/store/slices/taskbarSlice';
import { closeWindow, openWindow, toggleMinimizeWindow, focusWindow } from '@/store/slices/windowSlice';

export const openAppService = (dispatch: Dispatch, action: unknown) => {
  dispatch(openApp(action));
  dispatch(openWindow(action));
};

export const closeAppService = (dispatch: Dispatch, action: unknown) => {
  dispatch(closeApp(action));
  dispatch(closeWindow(action));
};

export const toggleMinimizeAppService = (dispatch: Dispatch, action: unknown) => {
  dispatch(toggleMinimizeWindow(action));
};

export const focusAppService = (dispatch: Dispatch, action: unknown) => {
  dispatch(focusWindow(action));
};
