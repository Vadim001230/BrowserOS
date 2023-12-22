import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { toggletNightLight } from '@/store/slices/batterySettingsSlice';
import { BaseButton, BaseButtonProps } from '../UI/BaseButton/BaseButton';

interface Props extends Omit<BaseButtonProps, 'children'> { }

export const NightLightButton = ({ ...attributes }: Props) => {
  const { isNightLightOn } = useAppSelector((state) => state.batterySettings);
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.body.classList[isNightLightOn ? 'add' : 'remove']('night-light');
  }, [isNightLightOn]);

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
