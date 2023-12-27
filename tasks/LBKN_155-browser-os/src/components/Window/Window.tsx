import { Rnd, Position, DraggableData } from 'react-rnd';
import { useAppDispatch } from '@/hooks/redux';
import { focusWindow, setWindowCoords } from '@/store/slices/windowSlice';
import { IWindow } from '@/types/IWindow';
import { WindowHeader } from '@/components/WindowHeader/WindowHeader';
import './Window.scss';

export const Window = ({
  id,
  title,
  isMinimized = false,
  isFullscreen,
  children,
  width = 600,
  height = 500,
  coords = {
    lastX: 0,
    lastY: 0,
  },
  iconURL,
}: IWindow) => {
  const dispatch = useAppDispatch();

  const handleWindowMouseDown = () => {
    dispatch(focusWindow({ id }));
  };

  const handleResizeStop = (position: Position) => {
    dispatch(setWindowCoords({ id, coords: { lastX: position.x, lastY: position.y } }));
  };

  const handleDragStop = (data: DraggableData)  => {
    dispatch(setWindowCoords({ id, coords: { lastX: data.x, lastY: data.y } }));
  };

  return (
    <Rnd
      className={`window-manager ${
          isFullscreen ? 'window-manager_fullscreen window-manager_transition' : ''
        } ${
          isMinimized ? 'window-manager_minimazed window-manager_transition' : ''
        }`}
      default={{
        x: coords.lastX,
        y: coords.lastY,
        width,
        height,
      }}
      minWidth={250}
      minHeight={250}
      dragHandleClassName='window-header'
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      onMouseDown={handleWindowMouseDown}
      disableDragging={isFullscreen}
    >
      <WindowHeader windowId={id} title={title} isFullscreen={isFullscreen} iconURL={iconURL} />
      <div className='window-content'>
        {children}
      </div>
    </Rnd>
  );
};
