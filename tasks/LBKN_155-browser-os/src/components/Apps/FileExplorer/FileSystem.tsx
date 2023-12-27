import { openAppService } from '@/serviсes/appServices';
import { BaseButton } from '@/components/UI/BaseButton/BaseButton';
import { IApp } from '@/types/IApp';
import { IDirectory } from '@/utils/tree';

interface Props {
  directory: IDirectory[] | IApp[];
  onFolderDoubleClick: (name: string) => void;
}

export const FileSystem = ({ directory, onFolderDoubleClick } : Props) => {
  return directory.map((part) => {
    if (part.type === 'dir') {
      return (
        <BaseButton
          key={part.name}
          className='file-explorer__item'
          onDoubleClick={() => onFolderDoubleClick(part.name)}
        >
          <img src='https://img.icons8.com/fluency/48/folder-invoices--v1.png' alt='' />
          <span>{part.name}</span>
        </BaseButton>
      );
    } else if (part.type === 'app') {
      const app = part as IApp;
      return (
        <BaseButton
          key={app.id}
          className='file-explorer__item'
          onDoubleClick={() => openAppService(app)}
        >
          <img src={app.iconURL} alt='' />
          <span>{app.title}</span>
        </BaseButton>
      );
    }
  });
};
