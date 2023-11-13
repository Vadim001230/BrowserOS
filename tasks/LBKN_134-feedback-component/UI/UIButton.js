import UIComponent from './UIComponent.js';

export default function UIButton(options) {
  const btn = UIComponent({
    tag: 'button',
    type: 'button', 
    ...options
  });

  btn.update = (value) => btn.name === value ? btn.classList.add('checked') : btn.classList.remove('checked');
  
  return btn;
}
