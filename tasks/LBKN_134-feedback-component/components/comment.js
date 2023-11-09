import fixTextareaHeight from '../utils/textarea.js'
import UIComponent from '../UI/UIComponent.js';

export default function TextField(options, isEmptyTextLength) {
  const handleTextarea = (e) => {
    fixTextareaHeight(e.target);
    isEmptyTextLength(e.target.value.length === 0);
  };

  const commentContainer = UIComponent({
    tag: 'div',
    class: 'comment-container',
    children: [
      UIComponent({
        tag: 'p',
        children: [options.subtitle],
      }),
      UIComponent({
        tag: 'textarea',
        listeners: { input: handleTextarea },
        class: 'textarea',
        type: 'text',
        name: 'text',
        placeholder: options.placeholder || '',
        ...(options.required && {required: Boolean(options.required)}),
      }),
    ]
  });

  return commentContainer;
}
