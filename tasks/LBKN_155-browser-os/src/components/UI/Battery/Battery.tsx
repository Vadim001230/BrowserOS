import { useBattery } from '@/hooks/useBattery';
import { BaseButton } from '@/components/UI/BaseButton/BaseButton';
import './Battery.scss';

export const BatteryStatus = () => {
  const batteryStatus = useBattery();

  if (!batteryStatus) return null;

  return (
    <BaseButton className="battery">
      <div className="battery__level">{`${Math.round(batteryStatus.level)}%`}</div>
      {batteryStatus.charging
        ? <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/ffffff/recharge-battery.png" alt="recharge-battery" />
        : <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/60/ffffff/full-battery.png" alt="full-battery" />
      }
    </BaseButton>
  );
};
