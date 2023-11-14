import UIButton from '../UI/UIButton.js';
import UIComponent from '../UI/UIComponent.js';

const LikeButton = (listeners) => {
  return UIButton({
    children: [
      UIComponent({
        tag: 'img',
        src: './UI/icons/like.svg', 
        alt: 'like',
      }),
    ],
    listeners,
    class: 'feedback__reaction-btn feedback__like', 
    name: 'like',
  });
};

export default LikeButton;
