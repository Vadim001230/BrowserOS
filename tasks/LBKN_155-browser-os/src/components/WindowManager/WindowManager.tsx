import { useAppSelector } from '@/hooks/redux';
import { Window } from '@/components/Window/Window';
import { AppsContent } from '@/components/Apps/appsConfig';

export const WindowManager = () => {
  const windows = useAppSelector((state) => state.windows.windows);

  return (
    <>
      {!!windows.length && windows.map((win) => {
        const Component = AppsContent[win.name];

        return (
          <Window
            key={win.id}
            {...win}
          >
            <Component />
          </Window>
        );
      })}
    </>
  );
};
