import { IApp } from '@/types/IApp';
import { ContextMenu, ContextMenuProps } from '@/components/UI/ContextMenu/ContextMenu';
import { ToggleAppToFavoritButton } from '@/components/ToggleAppToFavoritButton/ToggleAppToFavoritButton';
import { ToggleOpenAppButton } from '@/components/ToggleOpenAppButton/ToggleOpenAppButton';

interface Props extends Omit<ContextMenuProps, 'children'> {
  id: IApp['id'];
}

export const TaskbarShortcutContextMenu = ({ id, onClose, leftCoordinate }: Props) => {
  return (
    <ContextMenu onClose={onClose} leftCoordinate={leftCoordinate}>
      <ToggleAppToFavoritButton id={id} />
      <ToggleOpenAppButton id={id} />
    </ContextMenu>
  );
};
