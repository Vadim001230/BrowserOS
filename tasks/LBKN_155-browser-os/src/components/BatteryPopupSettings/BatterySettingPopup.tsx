import { BatterySettings } from '@/components/BatterySettings/BatterySettings';
import { PopupMenu, PopupMenuProps } from '@/components/UI/PopupMenu/PopupMenu';
import './BatterySettingPopup.scss';

interface Props extends Omit<PopupMenuProps, 'children'> { }

export const BatterySettingPopup = ({ onClose, leftCoordinate }: Props) => {
  return (
    <PopupMenu onClose={onClose} leftCoordinate={leftCoordinate} className='battery-settings-popup'>
      <BatterySettings />
    </PopupMenu>
  );
};
