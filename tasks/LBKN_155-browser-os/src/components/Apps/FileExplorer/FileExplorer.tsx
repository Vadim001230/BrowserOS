import { useState } from 'react';
import { BaseButton } from '@/components/UI/BaseButton/BaseButton';
import { IApp } from '@/types/IApp';
import { IDirectory, getCurrentDirectoryFromPath } from '@/utils/tree';
import { openAppService } from '@/serviсes/appServices';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { systemTree } from '@/components/Apps/appsConfig';
import ArrowIcon from '@/assets/icons/arrow.svg';
import './FileExplorer.scss';

export const FileExplorer = () => {
  const [historyOfDirectories, setHistoryOfDirectories] = useState<string[]>(['']);
  const [currentIndexOfHistory, setCurrentIndexOfHistory] = useState(0);
  
  const dispatch = useAppDispatch();
  const openApps: IApp[] = useAppSelector((state) => state.taskbar.taskbarApps.openedApps);

  const currentPath = historyOfDirectories[currentIndexOfHistory];
  const currentDirectory = getCurrentDirectoryFromPath(systemTree, currentPath);

  const handleFolderDoubleClick = (part: string) => {
    const newDirectory = currentPath === '/' ? `${part}/` : `${currentPath}/${part}`;
    setHistoryOfDirectories((prevHistory) => [...prevHistory.slice(0, currentIndexOfHistory + 1), newDirectory]);
    setCurrentIndexOfHistory((prevIndex) => prevIndex + 1);
  };

  const handleFileDoubleClick = (app: IApp) => {
    const selectedAppOpen = openApps.find((openApp) => openApp.id === app.id);
    if (!selectedAppOpen) {
      openAppService(dispatch, app);
    }
  };

  const navigateThroughHistory = (step: number) => {
    const newIndex = currentIndexOfHistory + step;
    if (newIndex >= 0 && newIndex < historyOfDirectories.length) {
      setCurrentIndexOfHistory(newIndex);
    }
  };

  const renderFileSystem = (directory: IDirectory[] | IApp[]) => {
    return directory.map((part) => {
      if (part.type === 'dir') {
        return (
          <BaseButton
            key={part.name}
            className='file-explorer__item'
            onDoubleClick={() => handleFolderDoubleClick(part.name)}
          >
            <img src='https://img.icons8.com/fluency/48/folder-invoices--v1.png' alt='' />
            <span>{part.name}</span>
          </BaseButton>
        );
      } else {
        const app = part as IApp;
        return (
          <BaseButton
            key={app.id}
            className='file-explorer__item'
            onDoubleClick={() => handleFileDoubleClick(app)}
          >
            <img src={app.iconURL} alt='' />
            <span>{app.title}</span>
          </BaseButton>
        );
      }
    });
  };

  return (
    <div className='file-explorer'>
      <div className='file-explorer__container'>
        <div className='file-explorer__controls'>
          <BaseButton className='file-explorer__control-button prev-button' onClick={() => navigateThroughHistory(-1)}>
            <ArrowIcon />
          </BaseButton>
          <BaseButton className='file-explorer__control-button next-button' onClick={() => navigateThroughHistory(1)}>
            <ArrowIcon />
          </BaseButton>
        </div>
        <div className='file-explorer__path'>:/{currentPath}</div>
      </div>
      <div className='file-explorer__grid'>
        {renderFileSystem(currentDirectory)}
      </div>
    </div>
  );
};
