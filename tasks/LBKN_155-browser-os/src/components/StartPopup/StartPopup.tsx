import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { focusAppService, openAppService } from '@/serviсes/appServices';
import { IApp } from '@/types/IApp';
import { PopupMenu, PopupMenuProps } from '@/components/UI/PopupMenu/PopupMenu';
import { BaseButton } from '@/components/UI/BaseButton/BaseButton';
import './StartPopup.scss';

interface Props extends Omit<PopupMenuProps, 'children'> { }

export const StartPopup = ({ onClose, leftCoordinate }: Props) => {
  const [searchText, setSearchText] = useState('');

  const appsList: IApp[] = useAppSelector((state) => state.apps);
  const openApps: IApp[] = useAppSelector((state) => state.taskbar.taskbarApps.openedApps);
  const dispatch = useAppDispatch();

  const searchedApps = appsList.filter((app) =>
    app.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleShortcutClick = (app: IApp) => {
    const selectedAppOpen = openApps.find((openApp) => openApp.id === app.id);
    if (selectedAppOpen) {
      focusAppService(dispatch, { id: app.id });
    } else {
      openAppService(dispatch, app);
    }
    onClose();
  };

  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <PopupMenu onClose={onClose} leftCoordinate={leftCoordinate} className='startpopup'>
      <input
        className='startpopup__search'
        type='search'
        onInput={handleSearchText}
        value={searchText}
        placeholder='Поиск приложений'
      />
      <div className='startpopup__container'>
        {searchedApps.length ? (
          searchedApps.map((app) => (
            <BaseButton key={app.id} className='startpopup__shortcut' onClick={() => handleShortcutClick(app)}>
              <img src={app.iconURL} alt='' />
              <span>{app.title}</span>
            </BaseButton>
          ))
        ) : (
          <p>Соответсвия не найдены</p>
        )}
      </div>
    </PopupMenu>
  );
};
