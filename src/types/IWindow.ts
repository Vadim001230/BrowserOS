import { IApp } from './IApp';

export interface IWindow extends IApp {
  children: React.ReactNode;
  isMinimized?: boolean;
  isFullscreen?: boolean;
  isFocused?: boolean;
  coords?: {
    coordX: number;
    coordY: number;
  }
}
