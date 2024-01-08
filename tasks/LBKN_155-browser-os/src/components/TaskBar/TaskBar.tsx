import { useAppSelector } from '@/hooks/redux';
import { useBattery } from '@/hooks/useBattery';
import { IApp } from '@/types/IApp';
import { shortcutService } from '@/serviсes/shortcutService';
import { BatteryStatusButton } from '@/components/BatteryStatusButton/BatteryStatusButton';
import { Clock } from '@/components/Clock/Clock';
import { StartMenuButton } from '@/components/StartMenuButton/StartMenuButton';
import { TaskbarAppButton } from '@/components/TaskbarAppButton/TaskbarAppButton';
import './TaskBar.scss';

export const TaskBar = () => {
  const batteryStatus = useBattery();

  const openedApps = shortcutService.getAppsByShortcutsList(useAppSelector((state) => state.taskbar.openedApps));
  const favoritApps = shortcutService.getAppsByShortcutsList(useAppSelector((state) => state.taskbar.favoritApps));

  const renderAppButtons = (apps: IApp[]) => apps.map((app) => {
    return (
      <TaskbarAppButton key={app.id} app={app} />
    );
  });

  return (
    <div className='taskbar'>
      <StartMenuButton />
      <div className='taskbar__container'>
        {!!favoritApps.length && renderAppButtons(favoritApps)}
        {!!openedApps.length && renderAppButtons(openedApps.filter((app) => !favoritApps.includes(app)))}
      </div>
      <div className='taskbar__container'>
        {batteryStatus && <BatteryStatusButton level={batteryStatus.level} charging={batteryStatus.charging} />}
        <Clock />
      </div>
    </div>
  );
};
