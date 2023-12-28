import { HTMLAttributes, ReactNode, RefObject } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { createPortal } from 'react-dom';
import './Popup.scss';

export interface PopupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  onClose: () => void;
  leftCoordinate?: number;
  topCoordinate?: number;
}

export const Popup = ({ children, onClose, leftCoordinate, topCoordinate, ...attributes }: PopupProps) => {
  const popupRef = useClickOutside(onClose) as RefObject<HTMLDivElement>;

  return (
    <>
      {createPortal(
        <div
          className={`popup ${attributes.className || ''}`}
          ref={popupRef}
          style={{ left: `${leftCoordinate?.toString()}px`, top: `${topCoordinate?.toString()}px` }}
        >
          {children}
        </div>,
        document.body
      )}
    </>
  );
};
