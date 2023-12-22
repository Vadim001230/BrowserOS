import { Shortcut } from '@/components/Shortcut/Shortcut';
import { useAppSelector } from '@/hooks/redux';
import { IApp } from '@/types/IApp';
import { TaskBar } from '@/components/TaskBar/TaskBar';
import './Desktop.scss';

export const Desktop = () => {
  const shortcutsList: IApp[] = useAppSelector((state) => state.shortcuts);

  return (
    <div className='desktop'>
      <div className='shortcuts-container'>
        {!!shortcutsList.length && shortcutsList.map((shortcut) => <Shortcut shortcut={shortcut} key={shortcut.id} />)}
      </div>
      <TaskBar />
    </div>
  );
};
