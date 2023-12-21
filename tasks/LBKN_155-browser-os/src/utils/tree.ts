import { IApp } from '@/types/IApp';

interface Tree {
  [key: string]: Tree | IApp;
}

export const transformArrayToTree = (arr: IApp[]): Tree => {
  const tree: Tree = {};

  arr.forEach((item) => {
    const parts = item.path.split('/');
    let currentLevel: Tree = tree;

    parts.forEach((part, index) => {
      currentLevel[part] = currentLevel[part] || {};

      if (index === parts.length - 1) {
        currentLevel[part] = { ...item };
      }

      currentLevel = currentLevel[part] as Tree;
    });
  });

  return tree;
};
