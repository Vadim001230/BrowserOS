import { HTMLAttributes, ReactNode, useRef } from 'react';
import { useClickAway } from '@/hooks/useClickAway';
import { Portal } from '@/components/UI/Portal/Portal';
import './PopupMenu.scss';

export interface PopupMenuProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  onClose: () => void;
  leftCoordinate?: number;
  isIgnoreClickOnRef?: boolean;
}

export const PopupMenu = ({ children, onClose, leftCoordinate, isIgnoreClickOnRef, ...attributes }: PopupMenuProps) => {
  const popupRef = useRef(null);

  useClickAway(popupRef, onClose, isIgnoreClickOnRef);

  return (
    <Portal>
      <div
        className={`popup-menu ${attributes.className || ''}`}
        ref={popupRef}
        style={{ left: `${leftCoordinate?.toString()}px` }}
      >
        {children}
      </div>
    </Portal>
  );
};
