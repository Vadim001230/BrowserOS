import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { IApp } from '@/types/IApp';
import { closeAppService, openAppService } from '@/serviсes/appServices';

interface Props {
  id: IApp['id'];
}

export const ToggleOpenAppButton = ({ id }: Props) => {
  const openedApps: IApp[] = useAppSelector((state) => state.taskbar.taskbarApps.openedApps);
  const favoritApps: IApp[] = useAppSelector((state) => state.taskbar.taskbarApps.favoritApps);

  const dispatch = useAppDispatch();

  const isAppOpen = openedApps.some((app) => app.id === id);
  const isAppInFavorit = favoritApps.some((app) => app.id === id);

  const toggleOpenApp = () => {
    if (isAppOpen) {
      closeAppService(dispatch, { id });
    } else if (isAppInFavorit) {
      const app = favoritApps.find((app) => app.id === id)!;
      openAppService(dispatch, app);
    }
  };

  return (
    <button
      onClick={toggleOpenApp}
      className='popup-menu__button'>
      {isAppOpen ? 'Закрыть окно' : 'Открыть окно'}
    </button>
  );
};
