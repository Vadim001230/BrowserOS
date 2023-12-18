import { ReactNode, useRef } from 'react';
import { useClickAway } from '@/hooks/useClickAway';
import { Portal } from '@/components/UI/Portal/Portal';
import './PopupMenu.scss';

interface Props {
  children: ReactNode; 
  onClose: () => void;
  leftCoordinate?: number;
  size?: 'small' | 'medium' | 'large';
}

export const PopupMenu = ({ children, onClose, leftCoordinate, size = 'small' }: Props) => {
  const popupRef = useRef(null);

  useClickAway(popupRef, onClose);

  return (
    <Portal>
      <div className={`popup-menu popup-menu_${size}`} ref={popupRef} style={{left: `${leftCoordinate?.toString()}px`}}>
        {children}
      </div>
    </Portal>
  );
};
