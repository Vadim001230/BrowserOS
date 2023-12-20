import React from 'react';
import { useAppSelector } from '@/hooks/redux';
import { IWindow } from '@/types/IWindow';
import { WindowManager } from '@/components/WindowManager/WindowManager';
import { Desktop } from '@/components/Desktop/Desktop';
import { AppsContent } from '@/components/Apps/appsConfig';

export const App = () => {
  const windows: IWindow[] = useAppSelector((state) => state.windows.windows);

  return (
    <>
      <Desktop />
      {!!windows.length && windows.map((window) => (
        <WindowManager
          key={window.id}
          {...window}
        >
          {React.createElement(AppsContent[window.name])}
        </WindowManager>
      ))}
    </>
  );
};
