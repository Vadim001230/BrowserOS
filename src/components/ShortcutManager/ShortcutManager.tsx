import { useAppSelector } from '@/hooks/redux';
import { Shortcut } from '@/components/Shortcut/Shortcut';
import './ShortcutManager.scss';

export const ShortcutManager = () => {
  const shortcutsList = useAppSelector((state) => state.shortcuts);

  return (
    <div className='shortcuts-container'>
      {!!shortcutsList.length && shortcutsList.map((shortcut) => <Shortcut shortcut={shortcut} key={shortcut.id} />)}
    </div>
  );
};
