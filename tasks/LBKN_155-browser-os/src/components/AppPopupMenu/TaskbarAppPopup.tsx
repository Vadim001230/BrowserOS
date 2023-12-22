import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { IApp } from '@/types/IApp';
import { closeAppService, openAppService } from '@/serviсes/appServices';
import { toggleAppToFavorits } from '@/store/slices/taskbarSlice';
import { PopupMenu, PopupMenuProps } from '@/components/UI/PopupMenu/PopupMenu';
import './TaskbarAppPopup.scss';

interface Props extends Omit<PopupMenuProps, 'children'> { 
  id: IApp['id'];
}

export const TaskbarAppPopup = ({ id, onClose, leftCoordinate }: Props) => {
  const openedApps: IApp[] = useAppSelector((state) => state.taskbar.taskbarApps.openedApps);
  const favoritApps: IApp[] = useAppSelector((state) => state.taskbar.taskbarApps.favoritApps);
  
  const dispatch = useAppDispatch();
  
  const isSelectedAppOpen = openedApps.some((app) => app.id === id);
  const isSelectedAppInFavorit = favoritApps.some((app) => app.id === id);

  const openApp = (app: IApp) => openAppService(dispatch, app);

  const closeSelectedApp = () => closeAppService(dispatch, { id });

  const toggleAppToFavorit = () => dispatch(toggleAppToFavorits({ id }));

  const toggleOpenSelectedApp = () => {
    if (isSelectedAppOpen) {
      closeSelectedApp();
    } else if (isSelectedAppInFavorit) {
      const app = favoritApps.find((app) => app.id === id)!;
      openApp(app);
    }
  };

  return (
    <PopupMenu onClose={onClose} leftCoordinate={leftCoordinate} isIgnoreClickOnRef={false}>
      <button
        onClick={toggleAppToFavorit}
        className='popup-menu__button'>
        {isSelectedAppInFavorit ? 'Открепить от' : 'Закрепить на'} панели задач
      </button>
      <button
        onClick={toggleOpenSelectedApp}
        className='popup-menu__button'>
        {isSelectedAppOpen ? 'Закрыть окно' : 'Открыть окно'}
      </button>
    </PopupMenu>
  );
};
