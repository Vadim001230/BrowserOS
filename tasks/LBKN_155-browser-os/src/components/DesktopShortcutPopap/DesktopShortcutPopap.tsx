import { useAppDispatch } from '@/hooks/redux';
import { IApp } from '@/types/IApp';
import { PopupMenu, PopupMenuProps } from '@/components/UI/PopupMenu/PopupMenu';
import { deleteShortcut } from '@/store/slices/shortcutSlice';

interface Props extends Omit<PopupMenuProps, 'children'> {
  id: IApp['id'];
}

export const DesktopShortcutPopap = ({ id, onClose, leftCoordinate, topCoordinate }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <PopupMenu
      onClose={onClose}
      className='shortcut-popup'
      leftCoordinate={leftCoordinate}
      topCoordinate={topCoordinate}
      isIgnoreClickOnRef={false}
    >
      <button
        onClick={() => dispatch(deleteShortcut({ id }))}
        className='popup-menu__button'>
        Удалить ярлык с рабочего стола
      </button>
    </PopupMenu>
  );
};
