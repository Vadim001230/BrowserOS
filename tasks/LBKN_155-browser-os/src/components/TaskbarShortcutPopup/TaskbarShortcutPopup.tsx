import { IApp } from '@/types/IApp';
import { TaskbarShortcutControls } from '@/components/TaskbarShortcutControls/TaskbarShortcutControls';
import { PopupMenu, PopupMenuProps } from '@/components/UI/PopupMenu/PopupMenu';

interface Props extends Omit<PopupMenuProps, 'children'> { 
  id: IApp['id'];
}

export const TaskbarShortcutPopup = ({ id, onClose, leftCoordinate }: Props) => {
  return (
    <PopupMenu onClose={onClose} leftCoordinate={leftCoordinate} isIgnoreClickOnRef={false}>
      <TaskbarShortcutControls id={id} />
    </PopupMenu>
  );
};
