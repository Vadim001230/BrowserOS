import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { IApp } from '@/types/IApp';
import { focusAppService, openAppService } from '@/serviсes/appServices';
import { BaseButton } from '@/components/UI/BaseButton/BaseButton';
import './Desktop.scss';

export const Desktop = () => {
  const dispatch = useAppDispatch();
  const appsList: IApp[] = useAppSelector((state) => state.apps.apps);
  const openApps: IApp[] = useAppSelector((state) => state.taskbar.taskbarApps.openedApps);

  const handleShortcutDoubleClick = (app: IApp) => {
    const selectedAppOpen = openApps.find((openApp) => openApp.id === app.id);
    if (selectedAppOpen) {
      focusAppService(dispatch, { id: app.id });
    } else {
      openAppService(dispatch, app);
    }
  };

  return (
    <div className='desktop'>
      <div className='desktop__container'>
        {appsList.length && appsList.map((app) => (
          <BaseButton
            key={app.id}
            className='desktop__shortcut'
            onDoubleClick={() => handleShortcutDoubleClick(app)}
          >
            <img src={app.iconURL} alt="" />
            <span>{app.name}</span>
          </BaseButton>
        ))}
      </div>
    </div>
  );
};
