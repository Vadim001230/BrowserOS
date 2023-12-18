import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { WindowManager } from '@/components/WindowManager/WindowManager';
import { IApp } from './types/IApp';
import { TaskBar } from '@/components/TaskBar/TaskBar';
import { openAppService } from '@/serviсes/appServices';
import { Calculator } from '@/components/Apps/Calculator/Calculator';
import { Notebook } from '@/components/Apps/Notebook/Notebook';

export const App = () => {
  const dispatch = useAppDispatch();
  const windows: IApp[] = useAppSelector((state) => state.windows.windows);

  const explore = {
    id: +new Date(),
    name: 'Проводник',
    children: 'Проводник',
    iconURL: 'https://img.icons8.com/fluency/48/windows-explorer.png',
  };

  const calculator = {
    id: +new Date(),
    name: 'Калькулятор',
    isFullscreen: false,
    width: 250,
    height: 400,
    children: <Calculator />,
    iconURL: 'https://img.icons8.com/fluency/48/calculator.png',
  };

  const notebook = {
    id: +new Date(),
    name: 'Блокнот',
    isFullscreen: false,
    width: 500,
    height: 400,
    children: <Notebook />,
    iconURL: 'https://img.icons8.com/fluency/48/spiral-bound-booklet.png',
  };


  return (
    <>
      <button onClick={() => openAppService(dispatch, calculator)}>create</button>
      <button onClick={() => openAppService(dispatch, explore)}>create</button>
      <button onClick={() => openAppService(dispatch, notebook)}>create</button>
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
