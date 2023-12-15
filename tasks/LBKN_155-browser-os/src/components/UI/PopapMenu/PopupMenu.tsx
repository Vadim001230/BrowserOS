import { ReactNode, useRef } from 'react';
import { Portal } from '@/components/UI/Portal/Portal';
import { useClickAway } from '@/hooks/useClickAway';
import './PopupMenu.scss';

interface Props {
  leftCoordinate: number;
  children: ReactNode; 
  onClose: () => void;
}

export const PopupMenu = ({ children, onClose, leftCoordinate }: Props) => {
  const popupRef = useRef(null);

  useClickAway(popupRef, onClose);

  return (
    <Portal>
      <div className="popup-menu" ref={popupRef} style={{left: `${leftCoordinate.toString()}px`}}>
        {children}
      </div>
    </Portal>
  );
};