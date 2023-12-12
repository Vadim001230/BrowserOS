import { ReactNode, useEffect, useRef, useState } from 'react';
import { BaseButton } from '@/components/UI/BaseButton/BaseButton';
import CloseIcon from '@/assets/icons/close.svg';
import MaximizeIcon from '@/assets/icons/maximize.svg';
import MaximizeMinIcon from '@/assets/icons/maximize-min.svg';
import MinimizeIcon from '@/assets/icons/minimize.svg';
import './WindowManager.scss';
import { defineCursorStyle } from '@/ustils/cursor';

interface Props {
  children: ReactNode;
}

const ANIMATION_TIME = 200;

export const WindowManager = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [width, setWidth] = useState<number>(400);
  const [height, setHeight] = useState<number>(200);
  const headerRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

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
    setIsFullscreen(!isFullscreen);
    if (windowRef.current) {
      windowRef.current.style.top = '0px';
      windowRef.current.style.left = '0px';
    }
  };

  const closeWindow = () => {
    setIsOpen(false);
  };

  const minimizedWindow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(true);
    windowRef.current?.classList.add('window-manager_transition');
    windowRef.current?.classList.add('window-manager_minimazed');
  };

  if (isFullscreen) {
    windowRef.current?.classList.add('window-manager_transition');
  } else {
    setTimeout(() => windowRef.current?.classList.remove('window-manager_transition'), ANIMATION_TIME);
  }

  if (isMinimized) {
    setTimeout(() => windowRef.current?.classList.add('window-manager_none'), ANIMATION_TIME);
  }

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

      setIsFullscreen(false);
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

  if (!isOpen) return null;


  return (
    <div
      className='window-manager'
      style={isFullscreen ? { width: '100vw', height: '100vh' } : { width: `${width}px`, height: `${height}px` }}
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
