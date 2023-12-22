import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setBrightness, toggleSaveBattery, toggletNightLight } from '@/store/slices/battarySettingsSlice';
import { PopupMenu, PopupMenuProps } from '@/components/UI/PopapMenu/PopupMenu';
import BrightnessIcon from '@/assets/icons/brightness.svg';
import './BatterySettingPopap.scss';

interface Props extends Omit<PopupMenuProps, 'children'> { }

export const BatterySettingPopap = ({ onClose, leftCoordinate }: Props) => {
  const { brightness, isOnNightLight, isOnSaveBattery } = useAppSelector((state) => state.battarySettings);
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.getElementById('brigtness-overlay')!.style.opacity = `${1 - brightness}`;
  }, [brightness]);

  useEffect(() => {
    document.body.classList[isOnNightLight ? 'add' : 'remove']('night-light');

    if (isOnSaveBattery) {
      dispatch(setBrightness(0.6));
    } else {
      dispatch(setBrightness(1));
    }
  }, [isOnSaveBattery, isOnNightLight]);

  const handleBrightnessSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setBrightness(+event.target.value));
  };

  return (
    <PopupMenu onClose={onClose} leftCoordinate={leftCoordinate} className='battery-popap'>
      <div className="battery-popap__container">
        <button
          className={`battery-popap__button ${isOnSaveBattery ? 'battery-popap__button_active' : ''}`}
          onClick={() => dispatch(toggleSaveBattery())}
        >
          Экономия заряда
        </button>
        <button
          className={`battery-popap__button ${isOnNightLight ? 'battery-popap__button_active' : ''}`}
          onClick={() => dispatch(toggletNightLight())}
        >
          Ночной свет
        </button>
      </div>
      <div className="battery-popap__container">
        <BrightnessIcon />
        <input
          type="range"
          min="0.2"
          max="1"
          step="0.01"
          value={brightness}
          onChange={handleBrightnessSliderChange}
          className="battery-popap__brightness-slider"
        />
      </div>
    </PopupMenu>
  );
};
