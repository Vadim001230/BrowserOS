import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { IWindowManager } from '@/components/WindowManager/WindowManager';
import { BaseButton } from '@/components/UI/BaseButton/BaseButton';
import { PopupMenu } from '@/components/UI/PopapMenu/PopupMenu';
import { closeAppService, openAppService } from '@/serviсes/appServices';
import { toggleMinimizeWindow, focusWindow } from '@/store/slices/windowSlice';
import { toggleAppToFavorits } from '@/store/slices/taskbarSlice';
import './TaskBar.scss';

export const TaskBar = () => {
  const [isPopapShown, setIsPopapShown] = useState(false);
  const [selectedId, setSelectedId] = useState<IWindowManager['id']>();
  const [popapLeftCoordinate, setPopapLeftCoordinate] = useState(0);

  const windows: IWindowManager[] = useAppSelector((state) => state.windows.windows);
  const openApps: IWindowManager[] = useAppSelector((state) => state.taskbar.taskbarApps.openedApps);
  const favoritApps: IWindowManager[] = useAppSelector((state) => state.taskbar.taskbarApps.favoritApps);

  const isSelectedAppInFavorit = favoritApps.some((app) => app.id === selectedId);

  const dispatch = useAppDispatch();

  const toggleMinimizeApp = (id: IWindowManager['id'], isFocused: IWindowManager['isFocused'], isMinimized: IWindowManager['isFocused']) => {
    const isAppOpen = openApps.some((app) => app.id === id);
    if (!isAppOpen) {
      const app = favoritApps.find((app) => app.id === id);
      openAppService(dispatch, app);
    }else if (!isFocused && isMinimized) {
      dispatch(toggleMinimizeWindow({ id }));
      dispatch(focusWindow({ id }));
    } else {
      dispatch(toggleMinimizeWindow({ id }));
    }
  };

  const toggleAppToFavorit = () => dispatch(toggleAppToFavorits({ id: selectedId }));

  const handleContextMenu = (e: React.MouseEvent<HTMLButtonElement>, id: IWindowManager['id']) => {
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
          const window = windows.find((window) => window.id === app.id);
          return (
            <BaseButton
              key={app.id}
              className="taskbar__app"
              isChecked={window?.isFocused && !window?.isMinimized}
              onClick={() => toggleMinimizeApp(app.id, app.isFocused, app.isMinimized)}
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
          const window = windows.find((window) => window.id === app.id);
          return (
            <BaseButton
              key={app.id}
              className="taskbar__app"
              isChecked={window?.isFocused && !window?.isMinimized}
              onClick={() => toggleMinimizeApp(app.id, app.isFocused, app.isMinimized)}
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
