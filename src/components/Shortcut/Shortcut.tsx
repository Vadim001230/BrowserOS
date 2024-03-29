import { useState } from 'react';
import { IShortcut } from '@/types/IShortcut';
import { shortcutService } from '@/serviсes/shortcutService';
import { BaseButton } from '@/components/UI/BaseButton/BaseButton';
import { DesktopShortcutContextMenu } from '@/components/DesktopShortcutContextMenu/DesktopShortcutContextMenu';
import './Shortcut.scss';

interface Props {
  shortcut: IShortcut;
}

export const Shortcut = ({ shortcut }: Props) => {
  const [isContextMenuShown, setIsContextMenuShown] = useState(false);
  const [targetElement, setTargetElement] = useState<HTMLElement>();

  const app = shortcutService.getAppByShortcutId(shortcut.id);

  const handleShortcutDoubleClick = () => {
    shortcutService.open(shortcut.id);
  };

  const handleShortcutContextMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTargetElement(e.currentTarget);
    setIsContextMenuShown(true);
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
      {isContextMenuShown && (
        <DesktopShortcutContextMenu
          id={app.id}
          onClose={() => setIsContextMenuShown(false)}
          target={targetElement}
        />
      )}
    </>
  );
};
