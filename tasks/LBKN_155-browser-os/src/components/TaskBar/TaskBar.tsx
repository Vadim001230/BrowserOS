import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useBattery } from '@/hooks/useBattery';
import { IApp } from '@/types/IApp';
import { focusAppService, openAppService, toggleMinimizeAppService } from '@/serviсes/appServices';
import { BaseButton } from '@/components/UI/BaseButton/BaseButton';
import { BatteryStatusButton } from '@/components/BatteryStatusButton/BatteryStatusButton';
import { Clock } from '@/components/Clock/Clock';
import { StartPopup } from '@/components/StartPopup/StartPopup';
import { BatterySettingPopup } from '@/components/BatteryPopupSettings/BatterySettingPopup';
import { TaskbarShortcutPopup } from '@/components/TaskbarShortcutPopup/TaskbarShortcutPopup';
import { TaskbarAppButton } from '@/components/TaskbarAppButton/TaskbarAppButton';
import './TaskBar.scss';

export const TaskBar = () => {
  const [isAppPopupMenuShown, setIsAppPopupMenuShown] = useState(false);
  const [isBatteryPopupShown, setIsBatteryPopupShown] = useState(false);
  const [isStartMenuShown, setIsStartMenuShown] = useState(false);
  const [selectedId, setSelectedId] = useState<IApp['id']>(0);
  const [popupLeftCoordinate, setPopupLeftCoordinate] = useState(0);
  const batteryStatus = useBattery();

  const dispatch = useAppDispatch();

  const openedApps: IApp[] = useAppSelector((state) => state.taskbar.taskbarApps.openedApps);
  const favoritApps: IApp[] = useAppSelector((state) => state.taskbar.taskbarApps.favoritApps);

  const isSelectedAppInFavorit = favoritApps.some((app) => app.id === selectedId);

  const closeAppPopupMenu = () => setIsAppPopupMenuShown(false);
  const closeBatteryPopup = () => setIsBatteryPopupShown(false);
  const closeStartMenu = () => setIsStartMenuShown(false);

  const closePopups = () => {
    closeAppPopupMenu();
    closeBatteryPopup();
    closeStartMenu();
  };

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
    closePopups();
    setPopupLeftCoordinate(e.currentTarget.offsetLeft);
    setSelectedId(id);
    setIsAppPopupMenuShown(true);
  };

  const handleStartMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    closePopups();
    setPopupLeftCoordinate(e.currentTarget.offsetLeft);
    if (!isStartMenuShown) {
      setIsStartMenuShown(true);
    }
  };

  const handleBatteryStatus = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    closePopups();
    setPopupLeftCoordinate(e.currentTarget.offsetLeft);
    setIsBatteryPopupShown(true);
  };

  const renderAppButtons = (apps: IApp[]) => apps.map((app) => {
    return (
      <TaskbarAppButton
        key={app.id}
        onClick={() => handleAppClick(app.id)}
        onContextMenu={(e) => handleAppContextMenu(e, app.id)}
        app={app}
      />
    );
  });

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
      {isBatteryPopupShown && <BatterySettingPopup onClose={closeBatteryPopup} leftCoordinate={popupLeftCoordinate} />}
    </div>
  );
};
