import { useTime } from '@/hooks/useTime';
import { BaseButton } from '@/components/UI/BaseButton/BaseButton';
import './Clock.scss';

export const Clock = () => {
  const [time, date] = useTime();

  return (
    <BaseButton className='clock'>
      <div>{time}</div>
      <div>{date}</div>
    </BaseButton>
  );
};
