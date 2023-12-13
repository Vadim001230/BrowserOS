import { BaseButton } from '../UI/BaseButton/BaseButton';
import './TaskBar.scss';

export interface App {
  button: string;
}

export const TaskBar = ({ apps }: { apps: App[] }) => {
  return (
    <div className="taskbar">
      <div className="taskbar__container">
        {apps.map((app, index) => (
          <BaseButton key={index} className="taskbar__app">
            {<app.button />}
          </BaseButton>
        ))}
      </div>
    </div>
  );
};
