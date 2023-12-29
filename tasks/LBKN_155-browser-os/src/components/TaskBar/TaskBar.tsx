import { useState } from 'react';
import { useAppSelector } from '@/hooks/redux';
import { useBattery } from '@/hooks/useBattery';
import { openShortcutService } from '@/serviсes/appServices';
import { getAppsByShortcutsList } from '@/serviсes/shortcutService';
import { IApp } from '@/types/IApp';
import { BaseButton } from '@/components/UI/BaseButton/BaseButton';
import { BatteryStatusButton } from '@/components/BatteryStatusButton/BatteryStatusButton';
import { Clock } from '@/components/Clock/Clock';
import { StartMenu } from '@/components/StartMenu/StartMenu';
import { BatterySettingPopup } from '@/components/BatteryPopupSettings/BatterySettingPopup';
import { TaskbarShortcutContextMenu } from '@/components/TaskbarShortcutContextMenu/TaskbarShortcutContextMenu';
import { TaskbarAppButton } from '@/components/TaskbarAppButton/TaskbarAppButton';
import './TaskBar.scss';

export const TaskBar = () => {
  const [isShortcutContextMenuShown, setIsShortcutContextMenuShown] = useState(false);
  const [isBatteryPopupShown, setIsBatteryPopupShown] = useState(false);
  const [isStartMenuShown, setIsStartMenuShown] = useState(false);
  const [selectedId, setSelectedId] = useState<IApp['id']>(0);
  const [popupLeftCoordinate, setPopupLeftCoordinate] = useState(0);
  const batteryStatus = useBattery();

  const openedApps = getAppsByShortcutsList(useAppSelector((state) => state.taskbar.openedApps));
  const favoritApps =  getAppsByShortcutsList(useAppSelector((state) => state.taskbar.favoritApps));

  const closeAppPopupMenu = () => setIsShortcutContextMenuShown(false);
  const closeBatteryPopup = () => setIsBatteryPopupShown(false);
  const closeStartMenu = () => setIsStartMenuShown(false);

  const handleAppClick = (id: IApp['id']) => {
    setSelectedId(id);
    openShortcutService(id);
  };

  const handleAppContextMenu = (e: React.MouseEvent<HTMLButtonElement>, id: IApp['id']) => {
    e.preventDefault();
    setPopupLeftCoordinate(e.currentTarget.offsetLeft);
    setSelectedId(id);
    setIsShortcutContextMenuShown(true);
  };

  const handleStartMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPopupLeftCoordinate(e.currentTarget.offsetLeft);
    if (!isStartMenuShown) {
      setIsStartMenuShown(true);
    }
  };

  const handleBatteryStatus = (e: React.MouseEvent<HTMLButtonElement>) => {
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
        <img src='https://img.icons8.com/fluency/48/windows-11.png' alt='start menu button' />
      </BaseButton>
      {isStartMenuShown && <StartMenu onClose={closeStartMenu} />}
      <div className='taskbar__container'>
        {!!favoritApps.length && renderAppButtons(favoritApps)}
        {!!openedApps.length && renderAppButtons(openedApps.filter((app) => !favoritApps.includes(app)))}
      </div>
      {isShortcutContextMenuShown && <TaskbarShortcutContextMenu id={selectedId} onClose={closeAppPopupMenu} leftCoordinate={popupLeftCoordinate} />}
      <div className='taskbar__container'>
        {batteryStatus && <BatteryStatusButton onClick={handleBatteryStatus} level={batteryStatus.level} charging={batteryStatus.charging} />}
        <Clock />
      </div>
      {isBatteryPopupShown && <BatterySettingPopup onClose={closeBatteryPopup} leftCoordinate={popupLeftCoordinate} />}
    </div>
  );
};
