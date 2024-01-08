import { HTMLAttributes, ReactNode, RefObject } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { createPortal } from 'react-dom';
import './Popup.scss';

export interface PopupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  onClose: () => void;
  target?: HTMLElement;
}

export const Popup = ({ children, onClose, target, ...attributes }: PopupProps) => {
  const popupRef = useClickOutside(onClose) as RefObject<HTMLDivElement>;
  const popupLayer = document.getElementById('popup-layer')!;
  
  const rect = target?.getBoundingClientRect();

  return (
    <>
      {createPortal(
        <div
          {...attributes}
          className={`popup ${attributes.className || ''}`}
          ref={popupRef}
          style={{ left: `${target?.offsetLeft.toString()}px`, top: `${rect?.top.toString()}px` }}
        >
          {children}
        </div>,
        popupLayer
      )}
    </>
  );
};
