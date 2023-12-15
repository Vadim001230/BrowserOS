export interface IApp {
  id: number;
  name: string;
  isMinimized: boolean;
  isFullscreen: boolean;
  isFocused: boolean;
  iconURL: string;
  children: React.ReactNode;
  width: number | string;
  height: number | string;
  coords: {
    startX: number;
    startY: number;
    lastX: number,
    lastY: number,
  }
}
