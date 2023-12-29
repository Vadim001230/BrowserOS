import { useAppSelector } from '@/hooks/redux';
import { IApp } from '@/types/IApp';
import { BaseButton, BaseButtonProps } from '@/components/UI/BaseButton/BaseButton';

interface Props extends Omit<BaseButtonProps, 'children'> {
  app: IApp;
}

export const TaskbarAppButton = ({ app, ...attributes }: Props) => {
  const win = useAppSelector((state) => state.windows.windows.find((win) => win.id === app.id));
  
  return (
    <BaseButton
      className={`taskbar__app ${win ? 'taskbar__app_opened' : ''}`}
      isChecked={win?.isFocused && !win?.isMinimized}
      title={app.title}
      {...attributes}
    >
      <img src={app.iconURL} alt='' />
    </BaseButton>
  );
};
