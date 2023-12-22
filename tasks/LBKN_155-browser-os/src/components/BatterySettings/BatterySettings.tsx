import { SaveBatteryButton } from '@/components/SaveBatteryButton/SaveBatteryButton';
import { NightLightButton } from '@/components/NightLightButton/NightLightButton';
import { BrightnessRangeInput } from '@/components/BrightnessRangeInput/BrightnessRangeInput';
import BrightnessIcon from '@/assets/icons/brightness.svg';
import './BatterySettings.scss';

export const BatterySettings = () => {
  return (
    <>
      <div className="battery-settings-container">
        <SaveBatteryButton />
        <NightLightButton />
      </div>
      <div className="battery-settings-container">
        <BrightnessIcon />
        <BrightnessRangeInput />
      </div>
    </>
  );
};
