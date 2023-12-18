import { BaseButton } from '@/components/UI/BaseButton/BaseButton';

export const StartMenuButton = () => {

  return (
    <BaseButton
      className='taskbar__app'
      title='Пуск'
    >
      <img src='https://img.icons8.com/fluency/48/windows-11.png' alt="" />
    </BaseButton>
  );
};
