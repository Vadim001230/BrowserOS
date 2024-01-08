import { useState } from 'react';
import { useAppSelector } from '@/hooks/redux';
import { appService } from '@/serviсes/appService';
import { IApp } from '@/types/IApp';
import { Popup } from '@/components/UI/Popup/Popup';
import { BaseButton } from '@/components/UI/BaseButton/BaseButton';
import './StartMenu.scss';

interface Props {
  onClose: () => void;
}

export const StartMenu = ({ onClose }: Props) => {
  const [searchText, setSearchText] = useState('');
  const appsList = useAppSelector((state) => state.apps);

  const searchedApps = appsList.filter((app) =>
    app.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleShortcutClick = (app: IApp) => {
    appService.open(app);
    onClose();
  };

  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <Popup onClose={onClose} className='startpopup'>
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
    </Popup>
  );
};
