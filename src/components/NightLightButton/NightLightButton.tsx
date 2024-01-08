import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { toggletNightLight } from '@/store/slices/batterySettingsSlice';
import { BaseButton } from '@/components/UI/BaseButton/BaseButton';

export const NightLightButton = () => {
  const { isNightLightOn } = useAppSelector((state) => state.batterySettings);
  const dispatch = useAppDispatch();

  return (
    <BaseButton
      className={`night-light-button ${isNightLightOn ? 'night-light-button_active' : ''}`}
      onClick={() => dispatch(toggletNightLight())}
      >
        Ночной свет
    </BaseButton>
  );
};
