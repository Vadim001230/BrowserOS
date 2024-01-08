import { useAppSelector } from '@/hooks/redux';
import defaultBackgroundImage from '@/assets/images/win11-bg.jpg';
import './BrowserOS.scss';

interface Props {
  children: React.ReactNode;
}

export const BrowserOS = ({ children }: Props) => {
  const { brightness, isNightLightOn } = useAppSelector((state) => state.batterySettings);

  return (
    <>
      <div
        className={`browser-view ${isNightLightOn ? 'night-light' : ''}`}
        style={{ backgroundImage: `url(${defaultBackgroundImage})` }}>
        {children}
      </div >
      <div className='brightness-overlay' style={{ opacity: `${1 - brightness}` }}></div>
    </>
  );
};
