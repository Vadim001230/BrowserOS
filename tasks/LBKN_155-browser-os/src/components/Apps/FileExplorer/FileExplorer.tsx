import { useState } from 'react';
import { BaseButton } from '@/components/UI/BaseButton/BaseButton';
import { FilesGrid } from './FilesGrid';
import { getCurrentDirectoryFromPath } from '@/utils/tree';
import { systemTree } from '@/components/Apps/appsConfig';
import ArrowIcon from '@/assets/icons/arrow.svg';
import './FileExplorer.scss';

export const FileExplorer = () => {
  const [historyOfDirectories, setHistoryOfDirectories] = useState<string[]>(['/']);
  const [currentIndexOfHistory, setCurrentIndexOfHistory] = useState(0);

  const currentPath = historyOfDirectories[currentIndexOfHistory];
  const currentDirectory = getCurrentDirectoryFromPath(systemTree, currentPath);

  const handleFolderDoubleClick = (part: string) => {
    const newDirectory = `${currentPath}/${part}`;
    setHistoryOfDirectories((prevHistory) => [...prevHistory.slice(0, currentIndexOfHistory + 1), newDirectory]);
    setCurrentIndexOfHistory((prevIndex) => prevIndex + 1);
  };

  const navigateThroughHistory = (step: number) => {
    const newIndex = currentIndexOfHistory + step;
    if (newIndex >= 0 && newIndex < historyOfDirectories.length) {
      setCurrentIndexOfHistory(newIndex);
    }
  };

  return (
    <div className='file-explorer'>
      <div className='file-explorer__container'>
        <div className='file-explorer__controls'>
          <BaseButton
            className='file-explorer__control-button prev-button'
            onClick={() => navigateThroughHistory(-1)}
            disabled={currentIndexOfHistory === 0}
          >
            <ArrowIcon />
          </BaseButton>
          <BaseButton
            className='file-explorer__control-button next-button'
            onClick={() => navigateThroughHistory(1)}
            disabled={currentIndexOfHistory === historyOfDirectories.length - 1}
          >
            <ArrowIcon />
          </BaseButton>
        </div>
        <div className='file-explorer__path'>:{currentPath}</div>
      </div>
      <div className='file-explorer__grid'>
        <FilesGrid directory={currentDirectory} onFolderDoubleClick={handleFolderDoubleClick} />
      </div>
    </div>
  );
};
