import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { toggletNightLight } from '@/store/slices/batterySettingsSlice';
import { BaseButton, BaseButtonProps } from '@/components/UI/BaseButton/BaseButton';

interface Props extends Omit<BaseButtonProps, 'children'> { }

export const NightLightButton = ({ ...attributes }: Props) => {
  const { isNightLightOn } = useAppSelector((state) => state.batterySettings);
  const dispatch = useAppDispatch();

  return (
    <BaseButton
      className={`night-light-button ${isNightLightOn ? 'night-light-button_active' : ''}`}
      onClick={() => dispatch(toggletNightLight())}
      {...attributes}
      >
        Ночной свет
    </BaseButton>
  );
};
