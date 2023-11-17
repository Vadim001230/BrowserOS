import UIComponent from './UIComponent.js';

export default function UIButton(options) {
  const btn = UIComponent({
    tag: 'button',
    type: 'button', 
    ...options
  });

  btn.update = (isBtnChecked) => {
    if (isBtnChecked) {
      btn.classList.add('checked');
    } else {
      btn.classList.remove('checked');
    }
  }
  
  return btn;
}
