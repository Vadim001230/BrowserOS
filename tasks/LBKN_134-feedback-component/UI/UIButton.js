import UIComponent from './UIComponent.js';

export default function UIButton(options) {
  const btn = UIComponent({
    tag: 'button',
    type: 'button', 
    ...options
  });

  btn.update = (isBtnChecked) => btn.classList[isBtnChecked ? 'add' : 'remove']('checked');
  
  return btn;
}
