import { useEffect, useRef } from 'react';

export const useTextareaResize = () => {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const currentTextarea = ref.current;

    const fixTextareaHeight = () => {
      if (!currentTextarea) {
        return;
      }
      currentTextarea.style.height = currentTextarea.scrollTop > 0 ? currentTextarea.scrollHeight + 'px' : 'auto';
    };

    currentTextarea?.addEventListener('input', fixTextareaHeight);

    return () => {
      currentTextarea?.removeEventListener('input', fixTextareaHeight);
    };
  }, []);

  return { ref };
};
