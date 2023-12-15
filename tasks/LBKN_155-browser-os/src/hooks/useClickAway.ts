import { useEffect } from 'react';

export const useClickAway = (ref: React.RefObject<HTMLElement>, callback: () => void) => {

  useEffect(() => {
    const listener = () => {
      if (!ref || !ref.current) {
        return;
      }
      callback();
    };

    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, [ref, callback]);
};
