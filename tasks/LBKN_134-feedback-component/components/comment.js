import { fixTextareaHeight } from '../utils/textarea.js'
import UIComponent from '../UI/UIComponent.js';

export default function TextField(options, handleComment) {
  const handleTextarea = (e) => {
    fixTextareaHeight(e.target);
    handleComment(e);
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
        name: 'comment',
        placeholder: options.placeholder || '',
        ...(options.required && {required: Boolean(options.required)}),
      }),
    ]
  });

  return commentContainer;
}
