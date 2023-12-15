import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { IApp } from '@/types/IApp';
import { BaseButton } from '@/components/UI/BaseButton/BaseButton';
import { PopupMenu } from '@/components/UI/PopapMenu/PopupMenu';
import { closeAppService, openAppService } from '@/serviсes/appServices';
import { toggleMinimizeWindow, focusWindow } from '@/store/slices/windowSlice';
import { toggleAppToFavorits } from '@/store/slices/taskbarSlice';
import './TaskBar.scss';

export const TaskBar = () => {
  const [isPopapShown, setIsPopapShown] = useState(false);
  const [selectedId, setSelectedId] = useState<IApp['id']>();
  const [popapLeftCoordinate, setPopapLeftCoordinate] = useState(0);

  const windowsList: IApp[] = useAppSelector((state) => state.windows.windows);
  const openApps: IApp[] = useAppSelector((state) => state.taskbar.taskbarApps.openedApps);
  const favoritApps: IApp[] = useAppSelector((state) => state.taskbar.taskbarApps.favoritApps);

  const isSelectedAppInFavorit = favoritApps.some((app) => app.id === selectedId);

  const dispatch = useAppDispatch();

  const toggleMinimizeApp = (id: IApp['id']) => {
    const isAppOpen = openApps.some((app) => app.id === id);
    if (!isAppOpen) {
      const app = favoritApps.find((app) => app.id === id);
      openAppService(dispatch, app);
    } else {
      dispatch(toggleMinimizeWindow({ id }));
      dispatch(focusWindow({ id }));
    }
  };

  const toggleAppToFavorit = () => dispatch(toggleAppToFavorits({ id: selectedId }));

  const handleContextMenu = (e: React.MouseEvent<HTMLButtonElement>, id: IApp['id']) => {
    e.preventDefault();
    setPopapLeftCoordinate(e.currentTarget.offsetLeft);
    setSelectedId(id);
    setIsPopapShown(true);
  };

  const closeApp = () => closeAppService(dispatch, { id: selectedId });
  const closePopapMenu = () => setIsPopapShown(false);

  return (
    <div className="taskbar">
      <div className="taskbar__container">
        {!!favoritApps.length && favoritApps.map((app) => {
          const window = windowsList.find((window) => window.id === app.id);
          return (
            <BaseButton
              key={app.id}
              className={`taskbar__app ${window ? 'taskbar__app_opened' : ''}`}
              isChecked={window?.isFocused && !window?.isMinimized}
              onClick={() => toggleMinimizeApp(app.id)}
              onContextMenu={(e) => handleContextMenu(e, app.id)}
              title={app.name}
            >
              <img src={app.iconURL} alt="" />
            </BaseButton>
          );
        })
        }
        {!!openApps.length && openApps.map((app) => {
          if (favoritApps.includes(app)) return;
          const window = windowsList.find((window) => window.id === app.id);
          return (
            <BaseButton
              key={app.id}
              className={`taskbar__app ${window ? 'taskbar__app_opened' : ''}`}
              isChecked={window?.isFocused && !window?.isMinimized}
              onClick={() => toggleMinimizeApp(app.id)}
              onContextMenu={(e) => handleContextMenu(e, app.id)}
              title={app.name}
            >
              <img src={app.iconURL} alt="" />
            </BaseButton>
          );
        })
        }
      </div>
      {isPopapShown && (
        <PopupMenu onClose={closePopapMenu} leftCoordinate={popapLeftCoordinate}>
          <button onClick={toggleAppToFavorit}>{isSelectedAppInFavorit ? 'Открепить от' : 'Закрепить на'} панели задач</button>
          <button onClick={closeApp}>Закрыть</button>
        </PopupMenu>
      )}
    </div>
  );
};
