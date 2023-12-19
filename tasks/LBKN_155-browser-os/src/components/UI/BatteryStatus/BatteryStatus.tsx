import { useBattery } from '@/hooks/useBattery';
import { BaseButton, BaseButtonProps } from '@/components/UI/BaseButton/BaseButton';
import './BatteryStatus.scss';

interface BattaryStatusProps extends Omit<BaseButtonProps, 'children'> { }

export const BatteryStatus = ({ ...attributes }): BattaryStatusProps => {
  const batteryStatus = useBattery();

  if (!batteryStatus) return null;

  return (
    <BaseButton className={`battery ${attributes.className || ''}`} {...attributes}>
      <div className="battery__level">{`${Math.round(batteryStatus.level)}%`}</div>
      {batteryStatus.charging
        ? <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/ffffff/recharge-battery.png" alt="recharge-battery" />
        : <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/60/ffffff/full-battery.png" alt="full-battery" />
      }
    </BaseButton>
  );
};
