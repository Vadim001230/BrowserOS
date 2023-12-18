import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { IApp } from '@/types/IApp';
import { closeAppService, focusService, openAppService, toggleMinimizeService } from '@/serviсes/appServices';
import { toggleAppToFavorits } from '@/store/slices/taskbarSlice';
import { StartMenuButton } from '@/components/UI/StartMenuButton/StartMenuButton';
import { BaseButton } from '@/components/UI/BaseButton/BaseButton';
import { PopupMenu } from '@/components/UI/PopapMenu/PopupMenu';
import { BatteryStatus } from '@/components/UI/Battery/Battery';
import { Clock } from '@/components/UI/Clock/Clock';
import './TaskBar.scss';

export const TaskBar = () => {
  const [isPopapMenuShown, setIsPopapShown] = useState(false);
  const [selectedId, setSelectedId] = useState<IApp['id']>();
  const [popapLeftCoordinate, setPopapLeftCoordinate] = useState(0);

  const dispatch = useAppDispatch();

  const windowsList: IApp[] = useAppSelector((state) => state.windows.windows);
  const openApps: IApp[] = useAppSelector((state) => state.taskbar.taskbarApps.openedApps);
  const favoritApps: IApp[] = useAppSelector((state) => state.taskbar.taskbarApps.favoritApps);

  const isSelectedAppOpen = openApps.some((app) => app.id === selectedId);
  const isSelectedAppInFavorit = favoritApps.some((app) => app.id === selectedId);

  const closePopapMenu = () => setIsPopapShown(false);
  const openPopapMenu = () => setIsPopapShown(true);

  const handleAppContextMenu = (e: React.MouseEvent<HTMLButtonElement>, id: IApp['id']) => {
    e.preventDefault();
    setPopapLeftCoordinate(e.currentTarget.offsetLeft);
    setSelectedId(id);
    openPopapMenu();
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
      toggleMinimizeService(dispatch, { id });
      focusService(dispatch, { id });
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

  return (
    <div className="taskbar">
      <StartMenuButton />
      <div className="taskbar__container">
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
