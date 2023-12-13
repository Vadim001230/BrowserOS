import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { open } from '@/store/slices/windowSlice';
import { IWindowManager, WindowManager } from '@/components/WindowManager/WindowManager';
import { TaskBar } from '@/components/TaskBar/TaskBar';

import MaximizeIcon from '@/assets/icons/maximize.svg';
import MaximizeMinIcon from '@/assets/icons/maximize-min.svg';

const apps = [{ button: MaximizeIcon }, { button: MaximizeMinIcon }];
export const App = () => {
  const dispatch = useAppDispatch();
  const windows: IWindowManager[] = useAppSelector((state) => state.windows.windows);

  return (
    <>
      <button onClick={() => dispatch(open('aaa'))}>create</button>
      {windows.map((window) => (
        <WindowManager
          key={window.id}
          {...window}
        />
      ))}
      <TaskBar apps={apps} />
    </>
  );
};
