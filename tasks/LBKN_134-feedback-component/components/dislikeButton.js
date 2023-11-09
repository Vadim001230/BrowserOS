import UIButton from '../UI/UIButton.js';
import UIComponent from '../UI/UIComponent.js';

const DislikeButton = (handler) => {
  return UIButton({
    children: [
      UIComponent({
        tag: 'img',
        src: './UI/icons/dislike.svg', 
        alt: 'dislike',
      }),
    ],
    listeners: { click: (e) => handler(e) },
    class: 'feedback__dislike', 
    name: 'dislike',
  });
};

export default DislikeButton;
