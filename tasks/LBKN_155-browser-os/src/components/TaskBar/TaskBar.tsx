import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useBattery } from '@/hooks/useBattery';
import { IWindow } from '@/types/IWindow';
import { IApp } from '@/types/IApp';
import { focusAppService, openAppService, toggleMinimizeAppService } from '@/serviсes/appServices';
import { BaseButton } from '@/components/UI/BaseButton/BaseButton';
import { BatteryStatusButton } from '@/components/BatteryStatusButton/BatteryStatusButton';
import { Clock } from '@/components/Clock/Clock';
import { StartPopup } from '@/components/StartPopup/StartPopup';
import { BatterySettingPopup } from '@/components/BatteryPopupSettings/BatterySettingPopup';
import { TaskbarShortcutPopup } from '@/components/TaskbarShortcutPopup/TaskbarShortcutPopup';
import './TaskBar.scss';

export const TaskBar = () => {
  const [isAppPopupMenuShown, setIsAppPopupMenuShown] = useState(false);
  const [isBattaryPopupShown, setIsBattaryPopupShown] = useState(false);
  const [isStartMenuShown, setIsStartMenuShown] = useState(false);
  const [selectedId, setSelectedId] = useState<IApp['id']>(0);
  const [popupLeftCoordinate, setPopupLeftCoordinate] = useState(0);
  const batteryStatus = useBattery();

  const dispatch = useAppDispatch();

  const windowsList: IWindow[] = useAppSelector((state) => state.windows.windows);
  const openedApps: IApp[] = useAppSelector((state) => state.taskbar.taskbarApps.openedApps);
  const favoritApps: IApp[] = useAppSelector((state) => state.taskbar.taskbarApps.favoritApps);

  const isSelectedAppInFavorit = favoritApps.some((app) => app.id === selectedId);

  const closeAppPopupMenu = () => setIsAppPopupMenuShown(false);
  const closeBattaryPopup = () => setIsBattaryPopupShown(false);
  const closeStartMenu = () => setIsStartMenuShown(false);

  const openApp = (app: IApp) => openAppService(dispatch, app);

  const handleAppClick = (id: IApp['id']) => {
    setSelectedId(id);
    const isSelectedAppOpen = openedApps.some((app) => app.id === id);
    if (isSelectedAppOpen) {
      toggleMinimizeAppService(dispatch, { id });
      focusAppService(dispatch, { id });
    } else if (isSelectedAppInFavorit) {
      const app = favoritApps.find((app) => app.id === id)!;
      openApp(app);
    }
  };

  const handleAppContextMenu = (e: React.MouseEvent<HTMLButtonElement>, id: IApp['id']) => {
    e.preventDefault();
    setPopupLeftCoordinate(e.currentTarget.offsetLeft);
    setSelectedId(id);
    closeStartMenu();
    closeBattaryPopup();
    setIsAppPopupMenuShown(true);
  };

  const handleStartMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setPopupLeftCoordinate(e.currentTarget.offsetLeft);
    closeAppPopupMenu();
    closeBattaryPopup();
    if (isStartMenuShown) {
      closeStartMenu();
    } else {
      setIsStartMenuShown(true);
    }
  };

  const handleBatteryStatus = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setPopupLeftCoordinate(e.currentTarget.offsetLeft);
    setIsBattaryPopupShown((prevShown) => !prevShown);
    closeStartMenu();
    closeAppPopupMenu();
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
        title={app.title}
      >
        <img src={app.iconURL} alt='' />
      </BaseButton>
    );
  };

  const renderAppButtons = (apps: IApp[]) => apps.map(renderAppButton);
  
  return (
    <div className='taskbar'>
      <BaseButton
        className='taskbar__app start-button'
        title='Пуск'
        onClick={handleStartMenuClick}
      >
        <img src='https://img.icons8.com/fluency/48/windows-11.png' alt="start menu button" />
      </BaseButton>
      {isStartMenuShown && <StartPopup onClose={closeStartMenu} leftCoordinate={popupLeftCoordinate} />}
      <div className="taskbar__container">
        {!!favoritApps.length && renderAppButtons(favoritApps)}
        {!!openedApps.length && renderAppButtons(openedApps.filter((app) => !favoritApps.includes(app)))}
      </div>
      {isAppPopupMenuShown && <TaskbarShortcutPopup id={selectedId} onClose={closeAppPopupMenu} leftCoordinate={popupLeftCoordinate} />}
      <div className="taskbar__container">
        {batteryStatus && <BatteryStatusButton onClick={handleBatteryStatus} level={batteryStatus.level} charging={batteryStatus.charging} />}
        <Clock />
      </div>
      {isBattaryPopupShown && <BatterySettingPopup onClose={closeBattaryPopup} leftCoordinate={popupLeftCoordinate} />}
    </div>
  );
};
