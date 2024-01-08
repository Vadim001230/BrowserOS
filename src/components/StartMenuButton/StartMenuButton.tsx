import { useState } from 'react';
import { BaseButton } from '@/components/UI/BaseButton/BaseButton';
import { StartMenu } from '@/components/StartMenu/StartMenu';
import StartMenuIcon from '@/assets/icons/windows11.svg';
import './StartMenuButton.scss';

export const StartMenuButton = () => {
  const [isStartMenuShown, setIsStartMenuShown] = useState(false);

  const closeStartMenu = () => setIsStartMenuShown(false);

  const handleStartMenuClick = () => {
    if (!isStartMenuShown) {
      setIsStartMenuShown(true);
    }
  };

  return (
    <>
      <BaseButton
        className='taskbar__app start-button'
        title='Пуск'
        onClick={handleStartMenuClick}
      >
        <StartMenuIcon />
      </BaseButton>
      {isStartMenuShown && <StartMenu onClose={closeStartMenu} />}
    </>
  );
};
