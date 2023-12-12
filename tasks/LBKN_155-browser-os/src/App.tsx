import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { IWindowManager, WindowManager } from '@/components/WindowManager/WindowManager';
import { openWindow } from '@/store/slices/windowSlice';

export const App = () => {
  const dispatch = useAppDispatch();
  const windows: IWindowManager[] = useAppSelector((state) => state.windows.windows);

  return (
    <>
      <button onClick={() => dispatch(openWindow('aaa'))}>create</button>
      {windows.map((window) => (
        <WindowManager
          key={window.id}
          {...window}
        />
      ))}
    </>
  );
};
