import { useState } from 'react';
import { BatterySettingPopup } from '@/components/BatterySettingPopup/BatterySettingPopup';
import { BaseButton } from '@/components/UI/BaseButton/BaseButton';
import './BatteryStatusButton.scss';

interface Props {
  level: number;
  charging: boolean;
}

export const BatteryStatusButton = ({ level, charging }: Props) => {
  const [isPopupShown, setIsPopupShown] = useState(false);
  const [targetElement, setTargetElement] = useState<HTMLElement>();

  const closePopup = () => setIsPopupShown(false);

  const handleBatteryStatus = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTargetElement(e.currentTarget);
    setIsPopupShown(true);
  };

  return (
    <>
      <BaseButton className='battery-status-button' onClick={handleBatteryStatus} >
        <div className='battery__level'>{`${Math.round(level)}%`}</div>
        {charging
          ? <img width="20" height="20" src="./src/assets/icons/recharge-battery.png" alt="recharge-battery" />
          : <img width="20" height="20" src="./src/assets/icons/full-battery.png" alt="full-battery" />
        }
      </BaseButton>
      {isPopupShown && <BatterySettingPopup onClose={closePopup} target={targetElement} />}
    </>
  );
};
