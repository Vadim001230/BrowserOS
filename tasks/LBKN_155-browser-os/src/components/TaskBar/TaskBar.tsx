import { useState } from 'react';
import { useAppSelector } from '@/hooks/redux';
import { useBattery } from '@/hooks/useBattery';
import { getAppsByShortcutsList } from '@/serviсes/appServices';
import { IApp } from '@/types/IApp';
import { BaseButton } from '@/components/UI/BaseButton/BaseButton';
import { BatteryStatusButton } from '@/components/BatteryStatusButton/BatteryStatusButton';
import { Clock } from '@/components/Clock/Clock';
import { StartMenu } from '@/components/StartMenu/StartMenu';
import { BatterySettingPopup } from '@/components/BatteryPopupSettings/BatterySettingPopup';
import { TaskbarAppButton } from '@/components/TaskbarAppButton/TaskbarAppButton';
import './TaskBar.scss';

export const TaskBar = () => {
  const [isBatteryPopupShown, setIsBatteryPopupShown] = useState(false);
  const [isStartMenuShown, setIsStartMenuShown] = useState(false);
  const [targetElement, setTargetElement] = useState<HTMLElement>();
  const batteryStatus = useBattery();

  const openedApps = getAppsByShortcutsList(useAppSelector((state) => state.taskbar.openedApps));
  const favoritApps =  getAppsByShortcutsList(useAppSelector((state) => state.taskbar.favoritApps));

  const closeBatteryPopup = () => setIsBatteryPopupShown(false);
  const closeStartMenu = () => setIsStartMenuShown(false);

  const handleStartMenuClick = () => {
    if (!isStartMenuShown) {
      setIsStartMenuShown(true);
    }
  };

  const handleBatteryStatus = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTargetElement(e.currentTarget);
    setIsBatteryPopupShown(true);
  };

  const renderAppButtons = (apps: IApp[]) => apps.map((app) => {
    return (
      <TaskbarAppButton key={app.id} app={app} />
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
      <div className='taskbar__container'>
        {batteryStatus && <BatteryStatusButton onClick={handleBatteryStatus} level={batteryStatus.level} charging={batteryStatus.charging} />}
        <Clock />
      </div>
      {isBatteryPopupShown && <BatterySettingPopup onClose={closeBatteryPopup} target={targetElement} />}
    </div>
  );
};
