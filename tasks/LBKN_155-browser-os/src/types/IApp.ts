export interface IApp {
  id: number;
  name: string;
  iconURL: string;
  children: React.ReactNode;
  isMinimized?: boolean;
  isFullscreen?: boolean;
  isFocused?: boolean;
  width?: number | string;
  height?: number | string;
  coords?: {
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
  }
}
