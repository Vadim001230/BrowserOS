import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setBrightness, toggleSaveBattery } from '@/store/slices/batterySettingsSlice';
import { BaseButton, BaseButtonProps } from '@/components/UI/BaseButton/BaseButton';
import { BRIGHTNESS_IN_BATTERY_SAVING_MODE } from '@/constants/constants';

interface Props extends Omit<BaseButtonProps, 'children'> { }

export const SaveBatteryButton = ({ ...attributes }: Props) => {
  const { isSaveBatteryOn } = useAppSelector((state) => state.batterySettings);
  const dispatch = useAppDispatch();

  const handleSaveBatteryButtonClick = () => {
    dispatch(toggleSaveBattery());
    dispatch(setBrightness(isSaveBatteryOn ? 1 : BRIGHTNESS_IN_BATTERY_SAVING_MODE));
  };

  return (
    <BaseButton
      className={`save-battery-button ${isSaveBatteryOn ? 'save-battery-button_active' : ''} ${attributes.className || ''}`}
      onClick={handleSaveBatteryButtonClick}
      {...attributes}
    >
      Экономия заряда
    </BaseButton>
  );
};
