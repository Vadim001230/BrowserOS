import { RefObject, useEffect, useRef } from 'react';

export const useClickOutside = (
  callback: (e: React.MouseEvent) => void,
  initialRef: RefObject<HTMLElement | null> = { current: null }
) => {
  const ref = useRef(initialRef.current);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) {
        return;
      }

      callback(e);
    };

    setTimeout(() => document.addEventListener('click', handler));
    setTimeout(() => document.addEventListener('contextmenu', handler));

    return () => {
      document.removeEventListener('click', handler);
      document.removeEventListener('contextmenu', handler);
    };
  }, []);

  return ref;
};
