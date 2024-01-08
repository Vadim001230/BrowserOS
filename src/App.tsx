import { BrowserOS } from '@/components/BrowserOS/BrowserOS';
import { Desktop } from './components/Desktop/Desktop';
import { WindowManager } from './components/WindowManager/WindowManager';

export const App = () => {
  return (
    <BrowserOS>
      <WindowManager />
      <Desktop />
      <div id='popup-layer'></div>
    </BrowserOS>
  );
};
