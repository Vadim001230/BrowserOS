import { BatterySettings } from '@/components/BatterySettings/BatterySettings';
import { PopupMenu, PopupMenuProps } from '@/components/UI/PopapMenu/PopupMenu';
import './BatterySettingPopup.scss';

interface Props extends Omit<PopupMenuProps, 'children'> { }

export const BatterySettingPopup = ({ onClose, leftCoordinate }: Props) => {
  return (
    <PopupMenu onClose={onClose} leftCoordinate={leftCoordinate} className='battery-settings-popap'>
      <BatterySettings />
    </PopupMenu>
  );
};
