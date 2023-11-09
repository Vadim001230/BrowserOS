export default function UIComponent(options) {
  const { tag, children, listeners, ...attributes } = options;
  const el = document.createElement(tag);

  children?.forEach((child) => {
    if (child instanceof HTMLElement) {
      el.append(child);
    }
    if (typeof child === 'string') {
      const textNode = document.createTextNode(child);
      el.append(textNode);
    }
  });

  if (listeners) {
    Object.entries(listeners).forEach(([event, handler]) =>
      el.addEventListener(event, handler)
    );
  }

  if (attributes) {
    Object.entries(attributes).forEach(([attr, value]) => {
      el.setAttribute(attr, value);
    });
  }

  return el;
};
