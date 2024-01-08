import { RefObject, useEffect } from 'react';

export const useClickInside = (
  callback: (e: React.MouseEvent) => void,
  ref: RefObject<HTMLElement | null>
) => {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current || !ref.current.contains(e.target as HTMLElement)) {
        return;
      }

      callback(e);
    };

    document.addEventListener('click', handler);
    document.addEventListener('contextmenu', handler);

    return () => {
      document.removeEventListener('click', handler);
      document.removeEventListener('contextmenu', handler);
    };
  }, []);
};
