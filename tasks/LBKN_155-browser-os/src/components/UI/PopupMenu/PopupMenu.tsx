import { HTMLAttributes, ReactNode, useRef } from 'react';
import { useClickAway } from '@/hooks/useClickAway';
import './PopupMenu.scss';
import { createPortal } from 'react-dom';

export interface PopupMenuProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  onClose: () => void;
  leftCoordinate?: number;
  topCoordinate?: number;
  isIgnoreClickOnRef?: boolean;
}

export const PopupMenu = ({ children, onClose, leftCoordinate, topCoordinate, isIgnoreClickOnRef, ...attributes }: PopupMenuProps) => {
  const popupRef = useRef(null);

  useClickAway(popupRef, onClose, isIgnoreClickOnRef);

  return (
    <>
      {createPortal(
        <div
          className={`popup-menu ${attributes.className || ''}`}
          ref={popupRef}
          style={{ left: `${leftCoordinate?.toString()}px`, top: `${topCoordinate?.toString()}px` }}
        >{children}
        </div>,
        document.body
      )}
    </>
  );
};
