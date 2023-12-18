import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { IApp } from '@/types/IApp';
import { closeAppService, focusAppService, openAppService, toggleMinimizeAppService } from '@/serviсes/appServices';
import { toggleAppToFavorits } from '@/store/slices/taskbarSlice';
import { BaseButton } from '@/components/UI/BaseButton/BaseButton';
import { PopupMenu } from '@/components/UI/PopapMenu/PopupMenu';
import { BatteryStatus } from '@/components/UI/Battery/Battery';
import { Clock } from '@/components/UI/Clock/Clock';
import SearchIcon from '@/assets/icons/search.svg';
import './TaskBar.scss';

export const TaskBar = () => {
  const [isPopapMenuShown, setIsPopapMenuShown] = useState(false);
  const [isStartMenuShown, setIsStartMenuShown] = useState(false);
  const [selectedId, setSelectedId] = useState<IApp['id']>();
  const [popapLeftCoordinate, setPopapLeftCoordinate] = useState(0);

  const dispatch = useAppDispatch();

  const windowsList: IApp[] = useAppSelector((state) => state.windows.windows);
  const openApps: IApp[] = useAppSelector((state) => state.taskbar.taskbarApps.openedApps);
  const favoritApps: IApp[] = useAppSelector((state) => state.taskbar.taskbarApps.favoritApps);

  const isSelectedAppOpen = openApps.some((app) => app.id === selectedId);
  const isSelectedAppInFavorit = favoritApps.some((app) => app.id === selectedId);

  const closePopapMenu = () => setIsPopapMenuShown(false);

  const handleAppContextMenu = (e: React.MouseEvent<HTMLButtonElement>, id: IApp['id']) => {
    e.preventDefault();
    setPopapLeftCoordinate(e.currentTarget.offsetLeft);
    setSelectedId(id);
    setIsStartMenuShown(false);
    setIsPopapMenuShown(true);
  };

  const openApp = (app: IApp) => openAppService(dispatch, app);
  const closeSelectedApp = () => closeAppService(dispatch, { id: selectedId });

  const toggleAppToFavorit = () => dispatch(toggleAppToFavorits({ id: selectedId }));

  const toggleOpenSelectedApp = () => {
    if (isSelectedAppOpen) {
      closeSelectedApp();
    } else if (isSelectedAppInFavorit) {
      const app = favoritApps.find((app) => app.id === selectedId)!;
      openApp(app);
    }
  };

  const handleAppClick = (id: IApp['id']) => {
    setSelectedId(id);
    const isSelectedAppOpen = openApps.some((app) => app.id === id);
    if (isSelectedAppOpen) {
      toggleMinimizeAppService(dispatch, { id });
      focusAppService(dispatch, { id });
    } else if (isSelectedAppInFavorit) {
      const app = favoritApps.find((app) => app.id === id)!;
      openApp(app);
    }
  };

  const renderAppButton = (app: IApp) => {
    const window = windowsList.find((window) => window.id === app.id);
    return (
      <BaseButton
        key={app.id}
        className={`taskbar__app ${window ? 'taskbar__app_opened' : ''}`}
        isChecked={window?.isFocused && !window?.isMinimized}
        onClick={() => handleAppClick(app.id)}
        onContextMenu={(e) => handleAppContextMenu(e, app.id)}
        title={app.name}
      >
        <img src={app.iconURL} alt="" />
      </BaseButton>
    );
  };

  const renderAppButtons = (apps: IApp[]) => apps.map(renderAppButton);

  const openStartMenu = () => setIsStartMenuShown(true);
  const closeStartMenu = () => setIsStartMenuShown(false);

  const handleStartMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setPopapLeftCoordinate(e.currentTarget.offsetLeft);
    setIsPopapMenuShown(false);
    if (isStartMenuShown) {
      closeStartMenu();
    } else {
      openStartMenu();
    }
  };

  return (
    <div className="taskbar">
      <BaseButton
        className='taskbar__app start-button'
        title='Пуск'
        onClick={handleStartMenuClick}
      >
        <img src='https://img.icons8.com/fluency/48/windows-11.png' alt="start menu button" />
      </BaseButton>
      {isStartMenuShown && (
        <PopupMenu onClose={closeStartMenu} leftCoordinate={popapLeftCoordinate} size='large'>
          <button>start</button>
        </PopupMenu>
      )}
      <div className="taskbar__container">
        <BaseButton className='taskbar__app'>
          <SearchIcon />
        </BaseButton>
        {!!favoritApps.length && renderAppButtons(favoritApps)}
        {!!openApps.length && renderAppButtons(openApps.filter((app) => !favoritApps.includes(app)))}
      </div>
      {isPopapMenuShown && (
        <PopupMenu onClose={closePopapMenu} leftCoordinate={popapLeftCoordinate}>
          <button onClick={toggleAppToFavorit}>{isSelectedAppInFavorit ? 'Открепить от' : 'Закрепить на'} панели задач</button>
          <button onClick={toggleOpenSelectedApp}>{isSelectedAppOpen ? 'Закрыть окно' : 'Открыть окно'}</button>
        </PopupMenu>
      )}
      <div className="taskbar__container">
        <BatteryStatus />
        <Clock />
      </div>
    </div>
  );
};
