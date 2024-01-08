import { useAppSelector } from '@/hooks/redux';
import { appService } from '@/serviсes/appService';
import { shortcutService } from '@/serviсes/shortcutService';
import { IApp } from '@/types/IApp';

interface Props {
  id: IApp['id'];
}

export const ToggleOpenAppButton = ({ id }: Props) => {
  const openedApps = useAppSelector((state) => state.taskbar.openedApps);

  const isAppOpen = openedApps.some((app) => app.id === id);

  const toggleOpenApp = () => {
    if (isAppOpen) {
      appService.close(id);
    } else {
      shortcutService.open(id);
    }
  };

  return (
    <button onClick={toggleOpenApp}>
      {isAppOpen ? 'Закрыть окно' : 'Открыть окно'}
    </button>
  );
};
