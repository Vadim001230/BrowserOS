import { appService } from '@/serviсes/appService';
import { IApp } from '@/types/IApp';
import { BaseButton } from '@/components/UI/BaseButton/BaseButton';
import { IDirectory } from '@/utils/tree';
import Folder from '@/assets/icons/folder.svg';

interface Props {
  directory: IDirectory[] | IApp[];
  onFolderDoubleClick: (name: string) => void;
}

export const FilesGrid = ({ directory, onFolderDoubleClick }: Props) => {
  return directory.map((part) => {
    if (part.type === 'dir') {
      return (
        <BaseButton
          key={part.name}
          className='file-explorer__item'
          onDoubleClick={() => onFolderDoubleClick(part.name)}
        >
          <Folder />
          <span>{part.name}</span>
        </BaseButton>
      );
    } else if (part.type === 'app') {
      const app = part as IApp;
      return (
        <BaseButton
          key={app.id}
          className='file-explorer__item'
          onDoubleClick={() => appService.open(app)}
        >
          <img src={app.iconURL} alt='app' />
          <span>{app.title}</span>
        </BaseButton>
      );
    }
  });
};
