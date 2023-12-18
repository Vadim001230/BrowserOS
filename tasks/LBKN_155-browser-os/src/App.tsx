import { useAppSelector } from '@/hooks/redux';
import { IApp } from '@/types/IApp';
import { WindowManager } from '@/components/WindowManager/WindowManager';
import { TaskBar } from '@/components/TaskBar/TaskBar';

import { Desktop } from '@/components/Desktop/Desktop';

export const App = () => {
  const windows: IApp[] = useAppSelector((state) => state.windows.windows);

  return (
    <>
      <Desktop />
      {windows.map((window) => (
        <WindowManager
          key={window.id}
          {...window}
        />
      ))}
      <TaskBar />
    </>
  );
};
