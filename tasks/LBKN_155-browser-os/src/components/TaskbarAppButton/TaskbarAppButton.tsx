import { useAppSelector } from '@/hooks/redux';
import { IApp } from '@/types/IApp';
import { BaseButton, BaseButtonProps } from '@/components/UI/BaseButton/BaseButton';

interface Props extends Omit<BaseButtonProps, 'children'> {
  app: IApp;
}

export const TaskbarAppButton = ({ app, ...attributes }: Props) => {
  const window = useAppSelector((state) => state.windows.windows.find((window) => window.id === app.id));
  
  return (
    <BaseButton
      className={`taskbar__app ${window ? 'taskbar__app_opened' : ''}`}
      isChecked={window?.isFocused && !window?.isMinimized}
      title={app.title}
      {...attributes}
    >
      <img src={app.iconURL} alt='' />
    </BaseButton>
  );
};
