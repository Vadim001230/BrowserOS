import UIComponent from '../UI/UIComponent.js';
import UIButton from '../UI/UIButton.js';

export default function FeedbackConstructor (title, reactionElements, handleSubmit) {
  return UIComponent({
    tag: 'form',
    class: 'feedback',
    children: [
      UIComponent({
        tag: 'div',
        class: 'reaction',
        children: [
          UIComponent({
            tag: 'h3',
            children: [title],
            class: 'feedback__title',
          }),
          UIComponent({
            tag: 'div',
            children: reactionElements,
            class: 'reaction-btns',
          }),
        ],
      }),
      UIButton({
        children: ['Submit'],
        class: 'feedback__submit-btn',
        name: 'submit',
        type: 'submit',
        listeners: { click: handleSubmit }
      }),
    ],
  });
}
