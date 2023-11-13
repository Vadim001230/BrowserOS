import { fixTextareaHeight } from '../utils/textarea.js'
import UIComponent from '../UI/UIComponent.js';

export default function TextField(options) {
  const createCommentContainer = (options) => {
    const handleInput = (e) => {
      fixTextareaHeight(e.target);
      options?.onInput(e);
    };
    
    return UIComponent({
    tag: 'div',
    class: 'comment-container',
    style: `display: ${options ? 'block' : 'none'}`,
    children: [
      UIComponent({
        tag: 'p',
        children: [options?.subtitle],
      }),
      UIComponent({
        tag: 'textarea',
        listeners: { input: handleInput },
        class: 'textarea',
        type: 'text',
        name: 'comment',
        placeholder: options?.placeholder || '',
        ...(options?.required && {required: Boolean(options.required)}),
      }),
    ]
  });
}

  let commentContainer = createCommentContainer(options);
  commentContainer.update = ((options) => {
    const newCommentContainer = createCommentContainer(options);
    commentContainer.replaceWith(newCommentContainer);
    newCommentContainer.update = commentContainer.update;
    commentContainer = newCommentContainer;
  });

  return commentContainer;
}
