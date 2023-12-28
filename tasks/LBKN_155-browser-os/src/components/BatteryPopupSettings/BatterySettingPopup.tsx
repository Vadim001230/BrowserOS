import { BatterySettings } from '@/components/BatterySettings/BatterySettings';
import { Popup, PopupProps } from '@/components/UI/Popup/Popup';
import './BatterySettingPopup.scss';

interface Props extends Omit<PopupProps, 'children'> { }

export const BatterySettingPopup = ({ onClose, leftCoordinate }: Props) => {
  return (
    <Popup onClose={onClose} leftCoordinate={leftCoordinate} className='battery-settings-popup'>
      <BatterySettings />
    </Popup>
  );
};
