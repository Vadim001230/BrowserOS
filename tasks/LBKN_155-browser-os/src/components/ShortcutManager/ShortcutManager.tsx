import { Shortcut } from '@/components/Shortcut/Shortcut';
import { useAppSelector } from '@/hooks/redux';
import { IApp } from '@/types/IApp';

export const ShortcutManager = () => {
  const shortcutsList: IApp[] = useAppSelector((state) => state.shortcuts);

  return (
    <div className='shortcuts-container'>
      {!!shortcutsList.length && shortcutsList.map((shortcut) => <Shortcut shortcut={shortcut} key={shortcut.id} />)}
    </div>
  );
};
