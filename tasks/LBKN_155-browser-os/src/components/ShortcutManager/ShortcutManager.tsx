import { useAppSelector } from '@/hooks/redux';
import { Shortcut } from '@/components/Shortcut/Shortcut';
import { IShortcut } from '@/types/IShortcut';
import './ShortcutManager.scss';

export const ShortcutManager = () => {
  const shortcutsList: IShortcut[] = useAppSelector((state) => state.shortcuts);

  return (
    <div className='shortcuts-container'>
      {!!shortcutsList.length && shortcutsList.map((shortcut) => <Shortcut shortcut={shortcut} key={shortcut.id} />)}
    </div>
  );
};
