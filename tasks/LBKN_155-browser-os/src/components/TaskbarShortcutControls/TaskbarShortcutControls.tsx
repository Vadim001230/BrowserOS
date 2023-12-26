import { IApp } from '@/types/IApp';
import { ToggleAppToFavoritButton } from '@/components/ToggleAppToFavoritButton/ToggleAppToFavoritButton';
import { ToggleOpenAppButton } from '@/components/ToggleOpenAppButton/ToggleOpenAppButton';

interface Props { 
  id: IApp['id'];
}

export const TaskbarShortcutControls = ({ id }: Props) => {
  return (
    <>
      <ToggleAppToFavoritButton id={id} />
      <ToggleOpenAppButton id={id} />
    </>
  );
};
