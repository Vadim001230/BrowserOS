import { useAppDispatch } from '@/hooks/redux';
import { setWindowFullscreen } from '@/store/slices/windowSlice';
import { IWindow } from '@/types/IWindow';
import { BaseButton } from '@/components/UI/BaseButton/BaseButton';
import CloseIcon from '@/assets/icons/close.svg';
import MaximizeIcon from '@/assets/icons/maximize.svg';
import MaximizeMinIcon from '@/assets/icons/maximize-min.svg';
import MinimizeIcon from '@/assets/icons/minimize.svg';
import { closeAppService, toggleMinimizeAppService } from '@/serviсes/appServices';
import './WindowHeader.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  id: IWindow['id'];
  title: IWindow['title'];
  isFullscreen: IWindow['isFullscreen']; 
  iconURL: IWindow['iconURL'];
}

export const WindowHeader = ({
  id,
  title,
  isFullscreen,
  iconURL, 
}: Props) => {
  const dispatch = useAppDispatch();

  const toggleFullscreen = () => dispatch(setWindowFullscreen({ id, isFullscreen: !isFullscreen }));
  const toggleMinimized = () => toggleMinimizeAppService(dispatch, { id });

  const closeWindow = () => closeAppService(dispatch, { id });

  return (
    <div className='window-header' onDoubleClick={toggleFullscreen}>
      <div className='window-header__info'>
        <div className='window-header__icon'>
          <img src={iconURL} alt='' />
        </div>
        <div className='window-header__title'>
          {title}
        </div>
      </div>
      <div className='window-header__control-container'>
        <BaseButton className='window-header__control' onClick={toggleMinimized} title='Свернуть'>
          <MinimizeIcon />
        </BaseButton>
        <BaseButton className='window-header__control' onClick={toggleFullscreen}>
          {isFullscreen ? <MaximizeIcon /> : <MaximizeMinIcon />}
        </BaseButton>
        <BaseButton className='window-header__control control-close' onClick={closeWindow} title='Закрыть'>
          <CloseIcon />
        </BaseButton>
      </div>
    </div>
  );
};
