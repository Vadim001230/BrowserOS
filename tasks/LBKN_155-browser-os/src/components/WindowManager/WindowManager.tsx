import { ReactNode, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '@/hooks/redux';
import {
  close,
  toggleMinimize,
  setFullscreen,
  focus,
  setWidth,
  setHeight,
  setCoords
} from '@/store/slices/windowSlice';
import { BaseButton } from '@/components/UI/BaseButton/BaseButton';
import CloseIcon from '@/assets/icons/close.svg';
import MaximizeIcon from '@/assets/icons/maximize.svg';
import MaximizeMinIcon from '@/assets/icons/maximize-min.svg';
import MinimizeIcon from '@/assets/icons/minimize.svg';
import { defineCursorStyle } from '@/ustils/cursor';
import './WindowManager.scss';

export interface IWindowManager {
  id: number;
  isMinimized: boolean;
  isFullscreen: boolean;
  children: ReactNode;
  width: number;
  height: number;
  coords: {
    startX: number;
    startY: number;
    lastX: number,
    lastY: number,
  }
}

const ANIMATION_TIME = 200;

export const WindowManager = ({ id, isMinimized, isFullscreen, children, width, height, coords }: IWindowManager) => {
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const stopResizing = () => setIsResizing(false);

  const handleWindowMouseDown = () => {
    setIsResizing(true);
    dispatch(focus({ id }));
  };

  const toggleFullscreen = () => {
    dispatch(setFullscreen({ id, isFullscreen: !isFullscreen }));
    console.log(coords);
  };

  const minimizedWindow = () => dispatch(toggleMinimize({ id }));

  const closeWindow = () => dispatch(close({ id }));

  useEffect(() => {
    if (isFullscreen) {
      windowRef.current?.classList.add('window-manager_transition');
    } else {
      setTimeout(() => windowRef.current?.classList.remove('window-manager_transition'), ANIMATION_TIME);
    }

    if (isMinimized) {
      windowRef.current?.classList.add('window-manager_transition');
      windowRef.current?.classList.add('window-manager_minimazed');
      setTimeout(() => windowRef.current?.classList.add('window-manager_none'), ANIMATION_TIME);
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
          dispatch(setHeight({ id, height: e.clientY - coords.lastY }));
          break;
        case 'ew-resize':
          dispatch(setWidth({ id, width: e.clientX - coords.lastX }));
          break;
        case 'default':
          break;
        default:
          dispatch(setWidth({ id, width: e.clientX - coords.lastX }));
          dispatch(setHeight({ id, height: e.clientY - coords.lastY }));
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

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [coords, isResizing]);


  useEffect(() => {
    if (!headerRef.current || !windowRef.current) return;

    const header = headerRef.current;
    const container = windowRef.current;

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      dispatch(setCoords({ id, coords: { startX: e.clientX, startY: e.clientY } }));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      if (!isFullscreen) {
        dispatch(setCoords({ id, coords: { lastX: container.offsetLeft, lastY: container.offsetTop } }));
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      dispatch(setFullscreen({ id, isFullscreen: false }));

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
      style={isFullscreen ? { width: '100vw', height: '100vh', top: 0, left: 0 } : { width: `${width}px`, height: `${height}px`, top: coords.lastY, left: coords.lastX }}
      onMouseDown={handleWindowMouseDown}
      ref={windowRef}
    >
      <div className='window-header' ref={headerRef} onDoubleClick={toggleFullscreen}>
        <div className="window-header__container">
          <BaseButton className='window-header__control' onClick={minimizedWindow}>
            <MinimizeIcon />
          </BaseButton>
          <BaseButton className='window-header__control' onClick={toggleFullscreen}>
            {isFullscreen ? <MaximizeIcon /> : <MaximizeMinIcon />}
          </BaseButton>
          <BaseButton className='window-header__control control-close' onClick={closeWindow}>
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
