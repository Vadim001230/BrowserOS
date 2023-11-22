export function UIFactory(options) {
  const { tag, children, listeners, ...attributes } = options;
  const el = document.createElement(tag);

  const setChildren = () => {
    children?.forEach((child) => {
      if (child instanceof HTMLElement) {
        el.append(child);
      }
      if (typeof child === 'string') {
        const textNode = document.createTextNode(child);
        el.append(textNode);
      }
    });
  }

  const setListeners = () => {
    if (listeners) {
      Object.entries(listeners).forEach(([event, handler]) =>
        el.addEventListener(event, handler)
      );
    }
  }
  
  const setAttributes = () => {
    if (attributes) {
      Object.entries(attributes).forEach(([attr, value]) =>
        el.setAttribute(attr, value)
      );
    }
  }

  const init = () => {
    setListeners();
    setChildren();
    setAttributes();
  }

  init();

  return el;
};
