
import { BaseButton, BaseButtonProps } from '@/components/UI/BaseButton/BaseButton';
import './BatteryStatus.scss';

interface BattaryStatusProps extends Omit<BaseButtonProps, 'children'> {
  level: number;
  charging: boolean;
}

export const BatteryStatus = ({ level, charging, ...attributes }: BattaryStatusProps) => {
  return (
    <BaseButton className={`battery ${attributes.className || ''}`} {...attributes}>
      <div className="battery__level">{`${Math.round(level)}%`}</div>
      {charging
        ? <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/ffffff/recharge-battery.png" alt="recharge-battery" />
        : <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/60/ffffff/full-battery.png" alt="full-battery" />
      }
    </BaseButton>
  );
};
