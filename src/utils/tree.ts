import { IApp } from '@/types/IApp';

export interface IDirectory {
  name: string;
  children?: IDirectory[] | IApp[];
  type: string;
}

export const createTreeFromArrayOfPaths = (arr: IApp[]) => {
  const tree: IDirectory[] = [];

  arr.forEach((item) => {
    const parts = item.path.split('/');
    let currentLevel = tree;

    parts.forEach((part, index) => {
      const existingNode = currentLevel.find((node) => node.name === part);

      if (existingNode) {
        if (!existingNode.children) {
          existingNode.children = [];
        }
        currentLevel = existingNode.children;
      } else if (index === parts.length - 1) {
        currentLevel.push(item);
      } else {
        const newNode = {
          name: part,
          type: 'dir',
          children: [],
        };
        currentLevel.push(newNode);
        currentLevel = newNode.children;
      }
    });
  });

  return tree;
};

export const getCurrentDirectoryFromPath = (tree: IDirectory[], path: string) => {
  const parts = path.split('/');
  let currentLevel = tree;

  for (const part of parts) {
    const directory = currentLevel.find((item) => item.name === part);
 
    if (directory && 'children' in directory) {
      currentLevel = directory.children;
    }
  }

  return currentLevel;
};
