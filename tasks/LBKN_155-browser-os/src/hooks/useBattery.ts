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

  const hookBattery = (battery: BatteryStatus) => {
    updateBattery(battery);
    battery.addEventListener('levelchange', () => updateBattery(battery));
    battery.addEventListener('chargingchange', () => updateBattery(battery));
  };

  const unHookBattery = (battery: BatteryStatus) => {
    battery.removeEventListener('levelchange', () => updateBattery(battery));
    battery.removeEventListener('chargingchange', () => updateBattery(battery));
  };

  useEffect(() => {
    if ('getBattery' in window.navigator) {
      navigator.getBattery().then((battery: BatteryStatus) => hookBattery(battery));
    }

    return () => {
      if ('getBattery' in window.navigator) {
        navigator.getBattery().then((battery: BatteryStatus) => unHookBattery(battery));
      }
    };
  }, []);

  return batteryStatus;
};
