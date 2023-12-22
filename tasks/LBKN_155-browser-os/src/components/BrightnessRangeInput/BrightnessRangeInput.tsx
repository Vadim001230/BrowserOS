import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setBrightness } from '@/store/slices/batterySettingsSlice';
import './BrightnessRangeInput.scss';

export const BrightnessRangeInput = () => {
  const { brightness } = useAppSelector((state) => state.batterySettings);
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.getElementById('brigtness-overlay')!.style.opacity = `${1 - brightness}`;
  }, [brightness]);
  
  const handleBrightnessSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setBrightness(+event.target.value));
  };

  return (
    <input
      type="range"
      min="0.2"
      max="1"
      step="0.01"
      value={brightness}
      onChange={handleBrightnessSliderChange}
      className="brightness-range"
    />
  );
};
