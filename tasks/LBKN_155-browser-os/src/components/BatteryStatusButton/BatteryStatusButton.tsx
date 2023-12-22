
import { BaseButton, BaseButtonProps } from '@/components/UI/BaseButton/BaseButton';
import './BatteryStatusButton.scss';

interface Props extends Omit<BaseButtonProps, 'children'> {
  level: number;
  charging: boolean;
}

export const BatteryStatusButton = ({ level, charging, ...attributes }: Props) => {
  return (
    <BaseButton className={`battery-status-button ${attributes.className || ''}`} {...attributes}>
      <div className="battery__level">{`${Math.round(level)}%`}</div>
      {charging
        ? <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/ffffff/recharge-battery.png" alt="recharge-battery" />
        : <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/60/ffffff/full-battery.png" alt="full-battery" />
      }
    </BaseButton>
  );
};
