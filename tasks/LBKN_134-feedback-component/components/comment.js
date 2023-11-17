import { fixTextareaHeight } from '../utils/textarea.js'
import UIComponent from '../UI/UIComponent.js';

export function TextField(options) {
  const createCommentContainer = (options) => {
    const handleInput = (e) => {
      fixTextareaHeight(e.target);
      options.onInput(e);
    };

    return UIComponent({
      tag: 'div',
      class: 'comment-container',
      children: [
        UIComponent({
          tag: 'p',
          children: [options?.title],
        }),
        UIComponent({
          tag: 'textarea',
          listeners: { input: handleInput },
          class: 'textarea',
          type: 'text',
          name: 'comment',
          placeholder: options?.placeholder || '',
          ...(options?.required && { required: Boolean(options.required) }),
        }),
      ]
    });
  }

  let commentContainer = createCommentContainer(options);
  let parent;

  commentContainer.update = ((options) => {
    if (!options) {
      parent = commentContainer.parentNode;
      commentContainer.remove();
    } else {
      parent = commentContainer.parentNode || parent;
      commentContainer.remove();
      commentContainer = createCommentContainer(options);
      parent.append(commentContainer);
    }
  });

  return commentContainer;
}
