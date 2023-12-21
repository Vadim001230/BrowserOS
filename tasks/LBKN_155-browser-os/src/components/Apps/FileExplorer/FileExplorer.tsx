import { useState } from 'react';
import { BaseButton } from '@/components/UI/BaseButton/BaseButton';
import { IApp } from '@/types/IApp';
import { openAppService } from '@/serviсes/appServices';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { treeOfPaths } from '@/components/Apps/appsConfig';
import ArrowIcon from '@/assets/icons/arrow.svg';
import './FileExplorer.scss';

export const FileExplorer = () => {
  const [currentParts, setCurrentParts] = useState<string[]>(Object.keys(treeOfPaths));
  const [currentPath, setCurrentPath] = useState('app');
  const [currentLevelOfTree, setCurrentLevelOfTree] = useState(treeOfPaths);

  const dispatch = useAppDispatch();
  const apps: IApp[] = useAppSelector((state) => state.apps);
  const openApps: IApp[] = useAppSelector((state) => state.taskbar.taskbarApps.openedApps);

  const handleFolderDoubleClick = (part: string) => {
    setCurrentPath((prevPath) => prevPath + '/' + part);
    setCurrentParts(Object.keys(currentLevelOfTree[part]));
    setCurrentLevelOfTree((prevLevel) => prevLevel[part]);
  };

  const handleFileDoubleClick = (app: IApp) => {
    const selectedAppOpen = openApps.find((openApp) => openApp.id === app.id);
    if (!selectedAppOpen) {
      openAppService(dispatch, app);
    }
  };

  const prevBtnHandler = () => {

  };

  const nextBtnHandler = () => {

  };

  const renderFileSystem = (paths: string[]) => {
    return paths.map((part) => {
      const app = apps.find((app) => app.name === part);
      if (app) {
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
      } else {
        return (
          <BaseButton
            key={part}
            className='file-explorer__item'
            onDoubleClick={() => handleFolderDoubleClick(part)}
          >
            <img src='https://img.icons8.com/fluency/48/folder-invoices--v1.png' alt='' />
            <span>{part}</span>
          </BaseButton>
        );
      }
    });
  };

  return (
    <div className='file-explorer'>
      <div className='file-explorer__container'>
        <div className='file-explorer__buttons'>
          <BaseButton className='file-explorer__control-button prev-button' onClick={prevBtnHandler}>
            <ArrowIcon />
          </BaseButton>
          <BaseButton className='file-explorer__control-button next-button' onClick={nextBtnHandler}>
            <ArrowIcon />
          </BaseButton>
        </div>
        <div className='file-explorer__path'>:/{currentPath}</div>
      </div>
      <div className='file-explorer__items'>
        {renderFileSystem(currentParts)}
      </div>
    </div>
  );
};
