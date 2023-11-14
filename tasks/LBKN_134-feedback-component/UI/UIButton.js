import UIComponent from './UIComponent.js';

export default function UIButton(options) {
  const btn = UIComponent({
    tag: 'button',
    type: 'button', 
    ...options
  });

  btn.update = (value) => btn.name === value ? btn.classList.add('feedback__reaction-btn_checked') : btn.classList.remove('feedback__reaction-btn_checked');
  
  return btn;
}
