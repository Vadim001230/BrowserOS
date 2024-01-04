import { useState } from 'react';
import { useAppSelector } from '@/hooks/redux';
import { openShortcutService } from '@/serviсes/appServices';
import { IApp } from '@/types/IApp';
import { BaseButton, BaseButtonProps } from '@/components/UI/BaseButton/BaseButton';
import { TaskbarShortcutContextMenu } from '@/components/TaskbarShortcutContextMenu/TaskbarShortcutContextMenu';

interface Props extends Omit<BaseButtonProps, 'children'> {
  app: IApp;
}

export const TaskbarAppButton = ({ app, ...attributes }: Props) => {
  const [isShortcutContextMenuShown, setIsShortcutContextMenuShown] = useState(false);
  const [selectedId, setSelectedId] = useState<IApp['id']>(0);
  const [targetElement, setTargetElement] = useState<HTMLElement>();
  
  const win = useAppSelector((state) => state.windows.windows.find((win) => win.id === app.id));

  const closeAppPopupMenu = () => setIsShortcutContextMenuShown(false);
  const handleAppClick = (id: IApp['id']) => {
    setSelectedId(id);
    openShortcutService(id);
  };

  const handleAppContextMenu = (e: React.MouseEvent<HTMLButtonElement>, id: IApp['id']) => {
    e.preventDefault();
    setTargetElement(e.currentTarget);
    setSelectedId(id);
    setIsShortcutContextMenuShown(true);
  };

  return (
    <>
      <BaseButton
        className={`taskbar__app ${win ? 'taskbar__app_opened' : ''}`}
        isChecked={win?.isFocused && !win?.isMinimized}
        onClick={() => handleAppClick(app.id)}
        onContextMenu={(e) => handleAppContextMenu(e, app.id)}
        title={app.title}
        {...attributes}
      >
        <img src={app.iconURL} alt='' />
      </BaseButton>
      {isShortcutContextMenuShown && <TaskbarShortcutContextMenu id={selectedId} onClose={closeAppPopupMenu} target={targetElement} />}
    </>
  );
};

