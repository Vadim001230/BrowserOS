import { IApp } from '@/types/IApp';
import { TaskbarShortcutControls } from '@/components/TaskbarShortcutControls/TaskbarShortcutControls';
import { ContextMenu, ContextMenuProps } from '@/components/UI/ContextMenu/ContextMenu';

interface Props extends Omit<ContextMenuProps, 'children'> { 
  id: IApp['id'];
}

export const TaskbarShortcutContextMenu = ({ id, onClose, leftCoordinate }: Props) => {
  return (
    <ContextMenu onClose={onClose} leftCoordinate={leftCoordinate}>
      <TaskbarShortcutControls id={id} />
    </ContextMenu>
  );
};
