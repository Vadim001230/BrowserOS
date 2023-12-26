import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { IApp } from '@/types/IApp';
import { openAppService } from '@/serviсes/appServices';
import { BaseButton } from '@/components/UI/BaseButton/BaseButton';
import { DesktopShortcutPopup } from '@/components/DesktopShortcutPopup/DesktopShortcutPopup';
import './Shortcut.scss';

interface Props {
  shortcut: IApp;
}

export const Shortcut = ({ shortcut }: Props) => {
  const [isShortcutPopupShown, setIsShortcutPopupShown] = useState(false);
  const [popupCoordinate, setPopupCoordinate] = useState({ left: 0, top: 0 });

  const openedApp = useAppSelector((state) => state.taskbar.taskbarApps.openedApps[shortcut.id]);

  const dispatch = useAppDispatch();

  const handleShortcutDoubleClick = () => {
    if (!openedApp) {
      openAppService(dispatch, shortcut);
    }
  };

  const handleShortcutContextMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPopupCoordinate({
      left: e.currentTarget.offsetLeft,
      top: e.currentTarget.offsetTop,
    });
    setIsShortcutPopupShown(true);
  };

  return (
    <>
      <BaseButton
        className='shortcut__item'
        onDoubleClick={handleShortcutDoubleClick}
        onContextMenu={handleShortcutContextMenu}
      >
        <img src={shortcut.iconURL} alt="" />
        <span>{shortcut.title}</span>
      </BaseButton>
      {isShortcutPopupShown && (
        <DesktopShortcutPopup
          id={shortcut.id}
          onClose={() => setIsShortcutPopupShown(false)}
          leftCoordinate={popupCoordinate.left}
          topCoordinate={popupCoordinate.top}
        />
      )}
    </>
  );
};
