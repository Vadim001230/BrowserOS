import { useAppSelector } from '@/hooks/redux';
import { IWindow } from '@/types/IWindow';
import { Window } from '@/components/Window/Window';
import { AppsContent } from '@/components/Apps/appsConfig';

export const WindowManager = () => {
  const windows: IWindow[] = useAppSelector((state) => state.windows.windows);

  return (
    <>
      {!!windows.length && windows.map((window) => {
        const Component = AppsContent[window.name];

        return (
          <Window
            key={window.id}
            {...window}
          >
            <Component />
          </Window>
        );
      })}
    </>
  );
};
