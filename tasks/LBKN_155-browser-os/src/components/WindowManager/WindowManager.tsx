import { ReactNode, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '@/hooks/redux';
import { closeWindow, toggleMinimizeWindow, setFullscreenWindow } from '@/store/slices/windowSlice';
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
  zIndex: number;
  width?: number;
  height?: number;
  coords?: {
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
  }
}

const ANIMATION_TIME = 200;

export const WindowManager = ({ id, isMinimized, isFullscreen, children }: IWindowManager) => {
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();
  const headerRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const coords = useRef<{
    startX: number,
    startY: number,
    lastX: number,
    lastY: number
  }>({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0
  });

  const startResizing = () => setIsResizing(true);
  const stopResizing = () => setIsResizing(false);

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(setFullscreenWindow({ id, isFullscreen: !isFullscreen }));
  };

  const minimizedWindow = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleMinimizeWindow({ id }));
  };

  const close = () => dispatch(closeWindow({ id }));

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
          setHeight(e.clientY);
          break;
        case 'ew-resize':
          setWidth(e.clientX);
          break;
        default:
          setWidth(e.clientX);
          setHeight(e.clientY);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
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
  }, [isResizing]);


  useEffect(() => {
    if (!headerRef.current || !windowRef.current) return;

    const header = headerRef.current;
    const container = windowRef.current;

    const onMouseDown = (e: MouseEvent) => {
      e.stopPropagation();
      setIsDragging(true);
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
    };

    const onMouseUp = () => {
      setIsDragging(false);
      coords.current.lastX = container.offsetLeft;
      coords.current.lastY = container.offsetTop;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      dispatch(setFullscreenWindow({ id, isFullscreen: false }));

      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      container.style.top = `${nextY}px`;
      container.style.left = `${nextX}px`;
    };

    header.addEventListener('mousedown', onMouseDown);
    header.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseUp);

    return () => {
      header.removeEventListener('mousedown', onMouseDown);
      header.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      className='window-manager'
      style={isFullscreen ? { width: '100vw', height: '100vh', top: 0, left: 0 } : { width: `${width}px`, height: `${height}px` }}
      onMouseDown={startResizing}
      ref={windowRef}
    >
      <div className='window-header' ref={headerRef} onDoubleClick={toggleFullscreen}>
        <div className="controls-container">
          <BaseButton className='window-header__control' onClick={minimizedWindow}>
            <MinimizeIcon />
          </BaseButton>
          <BaseButton className='window-header__control' onClick={toggleFullscreen}>
            {isFullscreen ? <MaximizeIcon /> : <MaximizeMinIcon />}
          </BaseButton>
          <BaseButton className='window-header__control control-close' onClick={close}>
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
