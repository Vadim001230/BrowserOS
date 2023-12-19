import { useEffect } from 'react';

export const useClickAway = (
  ref: React.RefObject<HTMLElement | null>,
  callback: (e: React.MouseEvent) => void,
  isIignoreClickOnRef: boolean = true
) => {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref || !ref.current || (isIignoreClickOnRef && ref.current.contains(e.target as Node))) {
        return;
      }
      callback(e);
    };

    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, [ref, callback, isIignoreClickOnRef]);
};
