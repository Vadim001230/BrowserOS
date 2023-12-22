import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setBrightness, toggleSaveBattery } from '@/store/slices/batterySettingsSlice';
import { BaseButton, BaseButtonProps } from '../UI/BaseButton/BaseButton';

interface Props extends Omit<BaseButtonProps, 'children'> { }

export const SaveBatteryButton = ({ ...attributes }: Props) => {
  const { isSaveBatteryOn } = useAppSelector((state) => state.batterySettings);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSaveBatteryOn) {
      dispatch(setBrightness(0.6));
    } else {
      dispatch(setBrightness(1));
    }
  }, [isSaveBatteryOn]);


  return (
    <BaseButton
      className={`save-battery-button ${isSaveBatteryOn ? 'save-battery-button_active' : ''} ${attributes.className || ''}`}
      onClick={() => dispatch(toggleSaveBattery())}
      {...attributes}
    >
      Экономия заряда
    </BaseButton>
  );
};
