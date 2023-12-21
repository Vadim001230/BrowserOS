import { useState } from 'react';
import { BaseButton } from '@/components/UI/BaseButton/BaseButton';
import { IApp } from '@/types/IApp';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { treeOfPaths } from '@/components/Apps/appsConfig';
import './FileExplorer.scss';
import { openAppService } from '@/serviсes/appServices';


export const FileExplorer = () => {


  const [currentParts, setCurrentParts] = useState<string[]>(Object.keys(treeOfPaths));
  const [fullPath, setFullPath] = useState('app');
  const [currentLevelOfTree, setCurrentLevelOfTree] = useState(treeOfPaths);

  const dispatch = useAppDispatch();
  const apps: IApp[] = useAppSelector((state) => state.apps);
  const openApps: IApp[] = useAppSelector((state) => state.taskbar.taskbarApps.openedApps);

  const handleFolderDoubleClick = (part: string) => {
    setFullPath((prevPath) => prevPath + '/' + part);
    setCurrentParts(Object.keys(currentLevelOfTree[part]));
    setCurrentLevelOfTree((prevLevel) => prevLevel[part]);
  };

  const handleFileDoubleClick = (app: IApp) => {
    const selectedAppOpen = openApps.find((openApp) => openApp.id === app.id);
    if (!selectedAppOpen) {
      openAppService(dispatch, app);
    }
  };

  const renderFileSystem = (paths: string[]) => {
    return paths.map((part) => {
      const app = apps.find((app) => app.name === part);
      if (app) {
        return (
          <BaseButton
            key={app.id}
            className='startpopap__shortcut'
            onDoubleClick={() => handleFileDoubleClick(app)}
          >
            <img src={app.iconURL} alt='' />
            <span>{app.name}</span>
          </BaseButton>
        );
      } else {
        return (
          <BaseButton
            key={+new Date()}
            className='startpopap__shortcut'
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
      <div className='file-explorer__path'>:/{fullPath}</div>
      <div className='file-explorer__container'>
        <aside className='file-explorer__sidebar'></aside>
        <div className='file-explorer__items'>
          {renderFileSystem(currentParts)}
        </div>
      </div>
    </div>
  );
};
