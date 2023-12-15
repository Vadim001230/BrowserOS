import { ReactNode, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '@/hooks/redux';
import {
  toggleMinimizeWindow,
  setWindowFullscreen,
  focusWindow,
  setWindowWidth,
  setWindowHeight,
  setWindowCoords
} from '@/store/slices/windowSlice';
import { BaseButton } from '@/components/UI/BaseButton/BaseButton';
import CloseIcon from '@/assets/icons/close.svg';
import MaximizeIcon from '@/assets/icons/maximize.svg';
import MaximizeMinIcon from '@/assets/icons/maximize-min.svg';
import MinimizeIcon from '@/assets/icons/minimize.svg';
import { defineCursorStyle } from '@/utils/cursor';
import './WindowManager.scss';
import { closeAppService } from '@/serviсes/appServices';

export interface IWindowManager {
  id: number;
  name: string;
  isMinimized: boolean;
  isFullscreen: boolean;
  isFocused: boolean;
  iconURL: string;
  children: ReactNode;
  width: number | string;
  height: number | string;
  coords: {
    startX: number;
    startY: number;
    lastX: number,
    lastY: number,
  }
}

const ANIMATION_TIME = 200;

export const WindowManager = ({ id, name, isMinimized, isFullscreen, children, width, height, coords, iconURL }: IWindowManager) => {
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const stopResizing = () => setIsResizing(false);

  const handleWindowMouseDown = () => {
    setIsResizing(true);
    dispatch(focusWindow({ id }));
  };

  const toggleFullscreen = () => dispatch(setWindowFullscreen({ id, isFullscreen: !isFullscreen }));

  const minimizedWindow = () => dispatch(toggleMinimizeWindow({ id }));

  const closeWindow = () => closeAppService(dispatch, { id });

  useEffect(() => {
    if (isFullscreen) {
      windowRef.current?.classList.add('window-manager_transition');
    } else {
      setTimeout(() => windowRef.current?.classList.remove('window-manager_transition'), ANIMATION_TIME);
    }

    if (isMinimized) {
      windowRef.current?.classList.add('window-manager_transition');
      windowRef.current?.classList.add('window-manager_minimazed');
      setTimeout(() => windowRef.current?.classList.add('window-manager_hide'), ANIMATION_TIME);
    } else {
      windowRef.current?.classList.remove('window-manager_hide');
      setTimeout(() => windowRef.current?.classList.remove('window-manager_minimazed'), 4);
    }
  }, [isFullscreen, isMinimized]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!windowRef.current) return;

      const cursorStyle = defineCursorStyle(e, windowRef.current);
      windowRef.current.style.cursor = cursorStyle;

      if (!isResizing) return;

      switch (cursorStyle) {
        case 'ns-resize':
          dispatch(setWindowHeight({ id, height: e.clientY - coords.lastY }));
          break;
        case 'ew-resize':
          dispatch(setWindowWidth({ id, width: e.clientX - coords.lastX }));
          break;
        case 'default':
          break;
        default:
          dispatch(setWindowWidth({ id, width: e.clientX - coords.lastX }));
          dispatch(setWindowHeight({ id, height: e.clientY - coords.lastY }));
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      e.stopPropagation();
      if (!windowRef.current) return;
      windowRef.current.style.cursor = defineCursorStyle(e, windowRef.current);
    };

    const handleMouseUp = () => {
      stopResizing();
      if (!windowRef.current) return;
      windowRef.current.style.cursor = 'default';
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [coords, isResizing]);


  useEffect(() => {
    if (!headerRef.current || !windowRef.current) return;

    const header = headerRef.current;
    const container = windowRef.current;

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      dispatch(setWindowCoords({ id, coords: { startX: e.clientX, startY: e.clientY } }));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      if (isFullscreen) return;
      dispatch(setWindowCoords({ id, coords: { lastX: container.offsetLeft, lastY: container.offsetTop } }));
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || isResizing) return;

      dispatch(setWindowFullscreen({ id, isFullscreen: false }));

      const nextX = e.clientX - coords.startX + coords.lastX;
      const nextY = e.clientY - coords.startY + coords.lastY;

      container.style.top = `${nextY}px`;
      container.style.left = `${nextX}px`;
    };

    header.addEventListener('mousedown', handleMouseDown);
    header.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseUp);

    return () => {
      header.removeEventListener('mousedown', handleMouseDown);
      header.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [coords, isDragging]);

  return (
    <div
      className='window-manager'
      style={
        isFullscreen
          ? { width: '100vw', height: '100vh', top: 0, left: 0 }
          : { width: `${width}px`, height: `${height}px`, top: coords.lastY, left: coords.lastX }
      }
      onMouseDown={handleWindowMouseDown}
      ref={windowRef}
    >
      <div className='window-header' ref={headerRef} onDoubleClick={toggleFullscreen}>
        <div className="window-header__info">
          <div className="window-header__icon">
            <img src={iconURL} alt="" />
          </div>
          <div className="window-header__title">
            {name}
          </div>
        </div>
        <div className="window-header__control-container">
          <BaseButton className='window-header__control' onClick={minimizedWindow} title='Свернуть'>
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
      <div className="window-content">
        {children}
      </div>
    </div>
  );
};
