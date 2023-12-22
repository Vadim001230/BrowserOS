import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setCurrentDateTime } from '@/store/slices/clockSlice';
import { formatDateTime } from '@/utils/date';
import { BaseButton } from '@/components/UI/BaseButton/BaseButton';
import './Clock.scss';

export const Clock = () => {
  const currentDateTime = useAppSelector((state) => state.clock);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const updateDateTime = () => {
      const newDateTime = new Date();
      dispatch(setCurrentDateTime(formatDateTime(newDateTime)));
    };

    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  const { time, date } = currentDateTime;
  
  return (
    <BaseButton className="clock">
      <div>{time}</div>
      <div>{date}</div>
    </BaseButton>
  );
};
