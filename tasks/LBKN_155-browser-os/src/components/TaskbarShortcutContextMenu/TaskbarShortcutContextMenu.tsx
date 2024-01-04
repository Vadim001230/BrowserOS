import { IApp } from '@/types/IApp';
import { ContextMenu, ContextMenuProps } from '@/components/UI/ContextMenu/ContextMenu';
import { ToggleAppToFavoritButton } from '@/components/ToggleAppToFavoritButton/ToggleAppToFavoritButton';
import { ToggleOpenAppButton } from '@/components/ToggleOpenAppButton/ToggleOpenAppButton';
import './TaskbarShortcutContextMenu.scss';

interface Props extends Omit<ContextMenuProps, 'children'> {
  id: IApp['id'];
}

export const TaskbarShortcutContextMenu = ({ id, ...props }: Props) => {
  return (
    <ContextMenu className='taskbar-shortcut-contextmenu' {...props}>
      <ToggleAppToFavoritButton id={id} />
      <ToggleOpenAppButton id={id} />
    </ContextMenu>
  );
};
