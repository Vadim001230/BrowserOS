import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setBrightness, toggleSaveBattery } from '@/store/slices/batterySettingsSlice';
import { BaseButton } from '@/components/UI/BaseButton/BaseButton';
import { BRIGHTNESS_IN_BATTERY_SAVING_MODE } from '@/constants/constants';
import { useEffect } from 'react';

export const SaveBatteryButton = () => {
  const { isSaveBatteryOn } = useAppSelector((state) => state.batterySettings);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setBrightness(isSaveBatteryOn ? BRIGHTNESS_IN_BATTERY_SAVING_MODE : 1));
  }, [isSaveBatteryOn]);

  const handleSaveBatteryButtonClick = () => {
    dispatch(toggleSaveBattery());
  };

  return (
    <BaseButton
      className={`save-battery-button ${isSaveBatteryOn ? 'save-battery-button_active' : ''}`}
      onClick={handleSaveBatteryButtonClick}
    >
      Экономия заряда
    </BaseButton>
  );
};
