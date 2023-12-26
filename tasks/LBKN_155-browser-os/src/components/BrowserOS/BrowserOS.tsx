import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setBrightness } from '@/store/slices/batterySettingsSlice';
import { BRIGHTNESS_IN_BATTERY_SAVING_MODE } from '@/constants/constants';
import './BrowserOS.scss';

interface Props {
  children: React.ReactNode;
}

export const BrowserOS = ({ children }: Props) => {
  const { brightness, isNightLightOn, isSaveBatteryOn } = useAppSelector((state) => state.batterySettings);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSaveBatteryOn) {
      dispatch(setBrightness(BRIGHTNESS_IN_BATTERY_SAVING_MODE));
    } else {
      dispatch(setBrightness(1));
    }
  }, [isSaveBatteryOn]);

  return (
    <>
      <div className={`browser-view ${isNightLightOn ? 'night-light' : ''}`}>{children}</div>
      <div className='brightness-overlay' style={{ opacity: `${1 - brightness}` }}></div>
    </>
  );
};
