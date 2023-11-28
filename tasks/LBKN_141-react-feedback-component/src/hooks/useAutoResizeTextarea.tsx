import { useEffect, useRef } from 'react';

const fixTextareaHeight = (textarea: HTMLTextAreaElement) => {
  if (!textarea) {
    return;
  }
  textarea.style.height = textarea.scrollTop > 0 ? textarea.scrollHeight + 'px' : 'auto';
};

export const useTextareaResize = () => {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const currentTextarea = ref.current;
    currentTextarea?.addEventListener('input', () => fixTextareaHeight(currentTextarea));

    return () => {
      currentTextarea?.removeEventListener('input', () => fixTextareaHeight(currentTextarea));
    };
  }, []);

  return { ref };
};
