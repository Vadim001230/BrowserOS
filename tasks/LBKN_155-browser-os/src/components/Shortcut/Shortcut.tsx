import { useState } from 'react';
import { IShortcut } from '@/types/IShortcut';
import { openShortcutService } from '@/serviсes/appServices';
import { getAppByShortcutId } from '@/serviсes/shortcutService';
import { BaseButton } from '@/components/UI/BaseButton/BaseButton';
import { DesktopShortcutPopup } from '@/components/DesktopShortcutPopup/DesktopShortcutPopup';
import './Shortcut.scss';

interface Props {
  shortcut: IShortcut;
}

export const Shortcut = ({ shortcut }: Props) => {
  const [isShortcutPopupShown, setIsShortcutPopupShown] = useState(false);
  const [popupCoordinate, setPopupCoordinate] = useState({ left: 0, top: 0 });

  const app = getAppByShortcutId(shortcut.id);
  
  const handleShortcutDoubleClick = () => {
    openShortcutService(shortcut.id);
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
        <img src={app.iconURL} alt="" />
        <span>{app.title}</span>
      </BaseButton>
      {isShortcutPopupShown && (
        <DesktopShortcutPopup
          id={app.id}
          onClose={() => setIsShortcutPopupShown(false)}
          leftCoordinate={popupCoordinate.left}
          topCoordinate={popupCoordinate.top}
        />
      )}
    </>
  );
};
