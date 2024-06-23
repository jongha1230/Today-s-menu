import { useEffect, useState } from 'react';
import { getCurrentTimeOfDay } from '../utils/getCurrentTimeOfDay';

export const useTimeOfDay = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const timeOfDay = getCurrentTimeOfDay();
    setTime(timeOfDay);
  }, []);

  return time;
};
