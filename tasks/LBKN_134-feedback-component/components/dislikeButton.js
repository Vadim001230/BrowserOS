import UIButton from '../UI/UIButton.js';
import UIComponent from '../UI/UIComponent.js';

const DislikeButton = (listeners) => {
  return UIButton({
    children: [
      UIComponent({
        tag: 'img',
        src: './UI/icons/dislike.svg', 
        alt: 'dislike',
      }),
    ],
    listeners,
    class: 'feedback__reaction-btn feedback__dislike', 
    name: 'dislike',
  });
};

export default DislikeButton;
