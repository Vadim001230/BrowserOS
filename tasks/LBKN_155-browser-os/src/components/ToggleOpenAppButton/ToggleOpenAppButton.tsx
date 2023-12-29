import { useAppSelector } from '@/hooks/redux';
import { IApp } from '@/types/IApp';
import { closeAppService, openShortcutService } from '@/serviсes/appServices';

interface Props {
  id: IApp['id'];
}

export const ToggleOpenAppButton = ({ id }: Props) => {
  const openedApps = useAppSelector((state) => state.taskbar.openedApps);

  const isAppOpen = openedApps.some((app) => app.id === id);

  const toggleOpenApp = () => {
    if (isAppOpen) {
      closeAppService({ id });
    } else {
      openShortcutService(id);
    }
  };

  return (
    <button onClick={toggleOpenApp}>
      {isAppOpen ? 'Закрыть окно' : 'Открыть окно'}
    </button>
  );
};
