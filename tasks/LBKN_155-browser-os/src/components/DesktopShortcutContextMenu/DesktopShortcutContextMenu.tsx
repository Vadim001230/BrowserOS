import { useAppDispatch } from '@/hooks/redux';
import { IApp } from '@/types/IApp';
import { ContextMenu, ContextMenuProps } from '../UI/ContextMenu/ContextMenu';
import { deleteShortcut } from '@/store/slices/shortcutSlice';

interface Props extends Omit<ContextMenuProps, 'children'> {
  id: IApp['id'];
}

export const DesktopShortcutContextMenu = ({ id, onClose, leftCoordinate, topCoordinate }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <ContextMenu
      onClose={onClose}
      leftCoordinate={leftCoordinate}
      topCoordinate={topCoordinate}
    >
      <button onClick={() => dispatch(deleteShortcut({ id }))}>
        Удалить ярлык с рабочего стола
      </button>
    </ContextMenu>
  );
};
