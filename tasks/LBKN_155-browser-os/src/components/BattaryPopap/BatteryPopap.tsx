import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setBrightness } from '@/store/slices/brightnessSlice';
import { PopupMenu, PopupMenuProps } from '@/components/UI/PopapMenu/PopupMenu';
import BrightnessIcon from '@/assets/icons/brightness.svg';
import './BatteryPopap.scss';

interface BatteryPopapProps extends Omit<PopupMenuProps, 'children'> { }

export const BatteryPopap = ({ onClose, leftCoordinate }: BatteryPopapProps) => {
  const [isOnNightLight, setIsOnNightLight] = useState(false);
  const [isOnSaveBattery, setIsOnSaveBattery] = useState(false);
  
  const brightness = useAppSelector((state) => state.brightness);
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
  }, [isOnNightLight, isOnSaveBattery]);

  const handlebBrightnessSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setBrightness(+event.target.value));
  };

  const toggleSaveBattery = () => setIsOnSaveBattery((prev) => !prev);

  const toggletNightLight = () => setIsOnNightLight((prev) => !prev);

  return (
    <PopupMenu onClose={onClose} leftCoordinate={leftCoordinate} className='battery-popap'>
      <div className="battery-popap__container">
        <button
          className={`battery-popap__button ${isOnSaveBattery ? 'battery-popap__button_active' : ''}`}
          onClick={toggleSaveBattery}
        >
          Экономия заряда
        </button>
        <button
          className={`battery-popap__button ${isOnNightLight ? 'battery-popap__button_active' : ''}`}
          onClick={toggletNightLight}
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
          onChange={handlebBrightnessSliderChange}
          className="battery-popap__brightness-slider"
        />
      </div>
    </PopupMenu>
  );
};
