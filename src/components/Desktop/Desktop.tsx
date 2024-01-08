import { ShortcutManager } from '@/components/ShortcutManager/ShortcutManager';
import { TaskBar } from '@/components/TaskBar/TaskBar';
import './Desktop.scss';

export const Desktop = () => {
  return (
    <div className='desktop'>
      <ShortcutManager />
      <TaskBar />
    </div>
  );
};
