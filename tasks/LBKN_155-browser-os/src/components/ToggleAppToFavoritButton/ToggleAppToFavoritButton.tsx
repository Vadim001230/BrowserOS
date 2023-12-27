import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { IApp } from '@/types/IApp';
import { toggleAppToFavorits } from '@/store/slices/taskbarSlice';

interface Props {
  id: IApp['id'];
}

export const ToggleAppToFavoritButton = ({ id }: Props) => {
  const isAppInFavorit = useAppSelector((state) => state.taskbar.favoritApps.some((app) => app.id === id));

  const dispatch = useAppDispatch();

  const toggleAppToFavorit = () => dispatch(toggleAppToFavorits({ id }));

  return (
    <button
      onClick={toggleAppToFavorit}
      className='popup-menu__button'>
      {isAppInFavorit ? 'Открепить от' : 'Закрепить на'} панели задач
    </button>
  );
};
