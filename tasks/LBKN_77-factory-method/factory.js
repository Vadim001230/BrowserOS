function elementFactory(type, className, ...children) {
  const el = document.createElement(type);
  el.className = className;

  children.forEach((child) => {
    if (typeof child === 'string') {
      el.textContent = child.toString();
    } else {
      el.append(child);
    }
  });

  return el;
}

const html = elementFactory(
  'div',
  'my-component',
  'Hello World!',
  elementFactory(
    'span', 
    'emoji',
    '👋',
  ),
)

document.body.append(html);
