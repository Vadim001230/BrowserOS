export const fixTextareaHeight = (element: HTMLTextAreaElement) => {
  element.style.height = element.scrollTop > 0 ? element.scrollHeight + 'px' : 'auto';
};
