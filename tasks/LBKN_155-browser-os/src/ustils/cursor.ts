export const defineCursorPosition = (e: MouseEvent, element: HTMLElement) => {
  const container = element.getBoundingClientRect();

  const { clientX, clientY } = e;
  const { left, top, width, height } = container;

  const threshold = 10;
  
  if (clientX < left + threshold && clientY < top + threshold) return 'top-left';
  else if (clientX > left + width - threshold && clientY < top + threshold) return 'top-right';
  else if (clientX < left + threshold && clientY > top + height - threshold) return 'bottom-left';
  else if (clientX > left + width - threshold && clientY > top + height - threshold) return 'bottom-right';
  else if (clientY < top + threshold) return 'top';
  else if (clientY > top + height - threshold) return 'bottom';
  else if (clientX < left + threshold) return 'left';
  else if (clientX > left + width - threshold) return 'right';

  return 'default';
};

export const defineCursorStyle = (e: MouseEvent, element: HTMLElement) => {
  const cursorRegion = defineCursorPosition(e, element);
  switch (cursorRegion) {
    case 'top':
    case 'bottom':
      return 'ns-resize';
    case 'left':
    case 'right':
      return 'ew-resize';
    case 'top-left':
    case 'bottom-right':
      return 'nwse-resize';
    case 'top-right':
    case 'bottom-left':
      return 'nesw-resize';
    default:
      return 'default';
  }
};
