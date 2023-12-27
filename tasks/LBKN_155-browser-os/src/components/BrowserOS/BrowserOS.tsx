import { useAppSelector } from '@/hooks/redux';
import defaultBackgroundImage from '@/assets/images/win11-bg.jpg';
import './BrowserOS.scss';

interface Props {
  children: React.ReactNode;
  backgroundImage?: string;
}

export const BrowserOS = ({ children, backgroundImage = defaultBackgroundImage }: Props) => {
  const { brightness, isNightLightOn } = useAppSelector((state) => state.batterySettings);

  return (
    <>
      <div
        className={`browser-view ${isNightLightOn ? 'night-light' : ''}`}
        style={{ backgroundImage: `url(${backgroundImage})` }}>
        {children}
      </div >
      <div className='brightness-overlay' style={{ opacity: `${1 - brightness}` }}></div>
    </>
  );
};
