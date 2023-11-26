import { useEffect, useRef } from 'react';

export const useAutoResizeTextarea = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const currentTextarea = textareaRef.current;
    const fixTextareaHeight = () => {
      if (currentTextarea) {
        currentTextarea.style.height =
          currentTextarea.scrollTop > 0 ? currentTextarea.scrollHeight + 'px' : 'auto';
      }
    };

    currentTextarea?.addEventListener('input', fixTextareaHeight);

    return () => {
      currentTextarea?.removeEventListener('input', fixTextareaHeight);
    };
  }, []);

  return textareaRef;
};
