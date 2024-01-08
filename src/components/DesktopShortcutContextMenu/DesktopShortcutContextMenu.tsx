import { useAppDispatch } from '@/hooks/redux';
import { IApp } from '@/types/IApp';
import { ContextMenu, ContextMenuProps } from '../UI/ContextMenu/ContextMenu';
import { deleteShortcut } from '@/store/slices/shortcutSlice';
import './DesktopShortcutContextMenu.scss';

interface Props extends Omit<ContextMenuProps, 'children'> {
  id: IApp['id'];
}

export const DesktopShortcutContextMenu = ({ id, ...props }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <ContextMenu className='desktop-shortcut-contextmenu' {...props}>
      <button onClick={() => dispatch(deleteShortcut({ id }))}>
        Удалить ярлык с рабочего стола
      </button>
    </ContextMenu>
  );
};
