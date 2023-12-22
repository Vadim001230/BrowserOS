import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { IApp } from '@/types/IApp';
import { toggleAppToFavorits } from '@/store/slices/taskbarSlice';

interface Props {
  id: IApp['id'];
}

export const ToggleAppToFavoritButton = ({ id }: Props) => {
  const favoritApps: IApp[] = useAppSelector((state) => state.taskbar.taskbarApps.favoritApps);

  const dispatch = useAppDispatch();

  const isAppInFavorit = favoritApps.some((app) => app.id === id);

  const toggleAppToFavorit = () => dispatch(toggleAppToFavorits({ id }));

  return (
    <button
      onClick={toggleAppToFavorit}
      className='popup-menu__button'>
      {isAppInFavorit ? 'Открепить от' : 'Закрепить на'} панели задач
    </button>
  );
};
