import UIComponent from './UIComponent.js';

export default function UIButton(options) {
  return UIComponent({
    tag: 'button',
    type: 'button', 
    ...options
  });
}
