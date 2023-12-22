export interface IApp {
  id: number | string;
  type: string;
  name: string;
  title: string;
  iconURL: string;
  path: string;
  width?: number;
  height?: number;
}
