import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { focusAppService, openAppService } from '@/serviсes/appServices';
import { IApp } from '@/types/IApp';
import { PopupMenu, PopupMenuProps } from '@/components/UI/PopapMenu/PopupMenu';
import { BaseButton } from '@/components/UI/BaseButton/BaseButton';
import './StartPopap.scss';

interface Props extends Omit<PopupMenuProps, 'children'> { }

export const StartPopap = ({ onClose, leftCoordinate }: Props) => {
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
    <PopupMenu onClose={onClose} leftCoordinate={leftCoordinate} className='startpopap'>
      <input
        className='startpopap__search'
        type='search'
        onInput={handleSearchText}
        value={searchText}
        placeholder='Поиск приложений'
      />
      <div className='startpopap__container'>
        {searchedApps.length ? (
          searchedApps.map((app) => (
            <BaseButton key={app.id} className='startpopap__shortcut' onClick={() => handleShortcutClick(app)}>
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
