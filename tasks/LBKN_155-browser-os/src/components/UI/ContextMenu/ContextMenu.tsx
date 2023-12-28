import { HTMLAttributes, ReactNode, RefObject } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useClickInside } from '@/hooks/useClickInside';
import { createPortal } from 'react-dom';
import './ContextMenu.scss';

export interface ContextMenuProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  onClose: () => void;
  leftCoordinate?: number;
  topCoordinate?: number;
}

export const ContextMenu = ({ children, onClose, leftCoordinate, topCoordinate, ...attributes }: ContextMenuProps) => {
  const сontextMenuRef = useClickOutside(onClose) as RefObject<HTMLDivElement>;
  useClickInside(onClose, сontextMenuRef);

  return (
    <>
      {createPortal(
        <div
          className={`context-menu ${attributes.className || ''}`}
          ref={сontextMenuRef}
          style={{ left: `${leftCoordinate?.toString()}px`, top: `${topCoordinate?.toString()}px` }}
        >
          {children}
        </div>,
        document.body
      )}
    </>
  );
};
