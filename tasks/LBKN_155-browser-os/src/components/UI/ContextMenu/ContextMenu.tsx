import { HTMLAttributes, ReactNode, RefObject } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useClickInside } from '@/hooks/useClickInside';
import { createPortal } from 'react-dom';
import './ContextMenu.scss';

export interface ContextMenuProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  onClose: () => void;
  target?: HTMLElement;
}

export const ContextMenu = ({ children, onClose, target, ...attributes }: ContextMenuProps) => {
  const сontextMenuRef = useClickOutside(onClose) as RefObject<HTMLDivElement>;
  useClickInside(onClose, сontextMenuRef);

  const rect = target?.getBoundingClientRect();

  return (
    <>
      {createPortal(
        <div
          {...attributes}
          className={`context-menu ${attributes.className || ''}`}
          ref={сontextMenuRef}
          style={{ left: `${target?.offsetLeft.toString()}px`, top: `${rect?.top.toString()}px` }}
        >
          {children}
        </div>,
        document.body
      )}
    </>
  );
};
