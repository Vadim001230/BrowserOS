import { useEffect, useState } from 'react';

interface BatteryStatus {
  level: number;
  charging: boolean;
}

export const useBattery = () => {
  const [batteryStatus, setBatteryStatus] = useState<BatteryStatus>();

  const updateBattery = (battery: BatteryStatus) => {
    setBatteryStatus({
      level: battery.level * 100,
      charging: battery.charging,
    });
  };

  const subscribeBattery = async () => {
    try {
      const battery = await navigator.getBattery();
      updateBattery(battery);
      battery.addEventListener('levelchange', () => updateBattery(battery));
      battery.addEventListener('chargingchange', () => updateBattery(battery));
    } catch (error) {
      console.error('Failed to get battery status:', error);
    }
  };

  const unsubscribeBattery = async () => {
    try {
      const battery = await navigator.getBattery();
      battery.removeEventListener('levelchange', () => updateBattery(battery));
      battery.removeEventListener('chargingchange', () => updateBattery(battery));
    } catch (error) {
      console.error('Failed to get battery status:', error);
    }
  };

  useEffect(() => {
    if ('getBattery' in navigator) {
      subscribeBattery();
    }

    return () => {
      if ('getBattery' in navigator) {
        unsubscribeBattery();
      }
    };
  }, []);

  return batteryStatus;
};
