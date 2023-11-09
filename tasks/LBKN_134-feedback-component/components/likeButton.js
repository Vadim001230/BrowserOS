import UIButton from '../UI/UIButton.js';
import UIComponent from '../UI/UIComponent.js';

const LikeButton = (handler) => {
  return UIButton({
    children: [
      UIComponent({
        tag: 'img',
        src: './UI/icons/like.svg', 
        alt: 'like',
      }),
    ],
    listeners: { click: (e) => handler(e) },
    class: 'feedback__like', 
    name: 'like',
  });
};

export default LikeButton;
