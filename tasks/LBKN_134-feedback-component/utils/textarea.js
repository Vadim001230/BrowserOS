const fixTextareaHeight = (element) => element.style.height = element.scrollTop > 0 ? element.scrollHeight + 'px' : 'auto';

export { fixTextareaHeight };
