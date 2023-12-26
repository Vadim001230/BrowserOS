import { formatTime, formatDate } from '@/utils/date';
import { useEffect, useState } from 'react';

const getTime = () => {
  return formatTime(new Date());
};

const getDate = () => {
  return formatDate(new Date());
};

export const useTime = (refreshCycle = 500) => {
  const [time, setTime] = useState(getTime());
  const [date, setDate] = useState(getDate());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getTime());
      setDate(getDate());
    },
      refreshCycle,
    );

    return () => clearInterval(intervalId);

  }, [refreshCycle]);

  return [time, date];
};
