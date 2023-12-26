import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { toggleSaveBattery } from '@/store/slices/batterySettingsSlice';
import { BaseButton, BaseButtonProps } from '@/components/UI/BaseButton/BaseButton';

interface Props extends Omit<BaseButtonProps, 'children'> { }

export const SaveBatteryButton = ({ ...attributes }: Props) => {
  const { isSaveBatteryOn } = useAppSelector((state) => state.batterySettings);
  const dispatch = useAppDispatch();

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
