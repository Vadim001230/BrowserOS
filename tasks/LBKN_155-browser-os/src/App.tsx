import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { IWindowManager, WindowManager } from '@/components/WindowManager/WindowManager';
import { TaskBar } from '@/components/TaskBar/TaskBar';
import { openAppService } from '@/serviсes/appServices';

export const App = () => {
  const dispatch = useAppDispatch();
  const windows: IWindowManager[] = useAppSelector((state) => state.windows.windows);

  const explorer = {
    id: +new Date(),
    name: 'Проводник',
    isMinimized: false,
    isFullscreen: true,
    isFocused: true,
    children: 'Проводник',
    iconURL: 'https://img.icons8.com/fluency/48/windows-explorer.png',
    width: 0,
    height: 0,
    coords: {
      startX: 0,
      startY: 0,
      lastX: 0,
      lastY: 0,
    }
  };
  
  const explore = {
    id: +new Date(),
    name: 'Explorer',
    isMinimized: false,
    isFullscreen: true,
    isFocused: true,
    children: 'internet explorer',
    iconURL: 'https://img.icons8.com/color/48/internet-explorer.png',
    width: 0,
    height: 0,
    coords: {
      startX: 0,
      startY: 0,
      lastX: 0,
      lastY: 0,
    }
  };

  return (
    <>
      <button onClick={() => openAppService(dispatch, explorer)}>create</button>
      <button onClick={() => openAppService(dispatch, explore)}>create</button>
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
