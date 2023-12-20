import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { deleteShortcut } from '@/store/slices/shortcutSlice';
import { IApp } from '@/types/IApp';
import { openAppService } from '@/serviсes/appServices';
import { BaseButton } from '@/components/UI/BaseButton/BaseButton';
import { PopupMenu } from '@/components/UI/PopapMenu/PopupMenu';
import './ShortcutManager.scss';

interface Props {
  shortcut: IApp;
}

export const ShortcutManager = ({ shortcut }: Props) => {
  const [isShortcutMenuShown, setIsShortcutMenuShown] = useState(false);
  const [popapCoordinate, setPopapCoordinate] = useState({ left: 0, top: 0 });

  const openedApp: IApp | undefined = useAppSelector((state) => state.taskbar.taskbarApps.openedApps[shortcut.id]);

  const dispatch = useAppDispatch();
  const handleShortcutDoubleClick = () => {
    if (!openedApp) {
      openAppService(dispatch, shortcut);
    }
  };

  const deleteFromShortcuts = () => {
    dispatch(deleteShortcut({ id: shortcut.id }));
  };

  const handleShortcutContextMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPopapCoordinate({
      left: e.currentTarget.offsetLeft,
      top: e.currentTarget.offsetTop,
    });
    setIsShortcutMenuShown(true);
  };

  return (
    <>
      <BaseButton
        className='shortcut__item'
        onDoubleClick={handleShortcutDoubleClick}
        onContextMenu={handleShortcutContextMenu}
      >
        <img src={shortcut.iconURL} alt="" />
        <span>{shortcut.name}</span>
      </BaseButton>
      {isShortcutMenuShown && (
        <PopupMenu
          onClose={() => setIsShortcutMenuShown(false)}
          className='shortcut-popap'
          leftCoordinate={popapCoordinate.left}
          topCoordinate={popapCoordinate.top}
          isIgnoreClickOnRef={false}
        >
          <button
            onClick={deleteFromShortcuts}
            className='popap-menu__button'>
            Удалить ярлык с рабочего стола
          </button>
        </PopupMenu>
      )}
    </>
  );
};
