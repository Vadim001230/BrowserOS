import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setBrightness } from '@/store/slices/brightnessSlice';
import { PopupMenu, PopupMenuProps } from '@/components/UI/PopapMenu/PopupMenu';
import './BatteryPopap.scss';

interface BatteryPopapProps extends Omit<PopupMenuProps, 'children'> { }

export const BatteryPopap = ({ onClose, leftCoordinate }: BatteryPopapProps) => {
  const brightness = useAppSelector((state) => state.brightness);
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.body.style.backdropFilter = `brightness(${brightness})`;
    document.body.style.filter = `brightness(${brightness})`;
  }, [brightness]);

  const handlebBrightnessSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setBrightness(+event.target.value));
  };

  const handleSaveBattery = () => {
    dispatch(setBrightness(0.6));
  };

  return (
    <PopupMenu onClose={onClose} leftCoordinate={leftCoordinate} className='brightness-popap'>
      <div className="brightness-popap__container">
        <input
          type="range"
          min="0.15"
          max="1"
          step="0.01"
          value={brightness}
          onChange={handlebBrightnessSliderChange}
          className="brightness-popap__slider"
        />
        <button className="brightnes-popap__button" onClick={handleSaveBattery}>Экономия заряда</button>
      </div>
    </PopupMenu>
  );
};
