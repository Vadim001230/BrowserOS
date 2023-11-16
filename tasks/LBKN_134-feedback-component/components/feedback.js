import { TextField } from './comment.js';
import SubmitBtn from './submitBtn.js';
import UIComponent from '../UI/UIComponent.js';

const textError = UIComponent({
  tag: 'span',
  children: ['An error has occurred. Try again'],
  style: 'color: red',
});

const submitBtn = SubmitBtn();
const commentField = TextField();

export function FeedbackComponent({ title, onSubmit, controls }) {
  const state = {
    comment: '',
    reaction: '',
    reactionElements: [],
    сommentsOptions: {},

    get currentCommentOptions() {
      return this.сommentsOptions[this.reaction];
    },

    get isCommentValid() {
      return (
        (this.comment.length > 0 && this.currentCommentOptions?.required) ||
        !this.currentCommentOptions?.required
      );
    },
  };

  const handleReactionClick = (id) => {
    proxyState.reaction = id; 
    proxyState.comment = '';
  }

  const handleCommentInput = (e) => proxyState.comment = e.target.value;

  const handleSubmit = (e) => {
    onSubmit(e, { reaction: state.reaction, comment: state.comment }).catch(() => {
      textError && textError.remove();
      feedback.append(textError);
    });
  };

  controls.forEach((control) => {
    state.reactionElements.push(control.element({ click: () => handleReactionClick(control.id) }));
    state.сommentsOptions[control.id] = control.commentOptions || null;
  });

  const onCommentChange = () => {
    submitBtn.update({
      onSubmit: handleSubmit, 
      isVisible: !!state.reaction, 
      isDisabled: !state.isCommentValid,
    });

    textError.remove();
  }

  const onReactionChange = () => {
    commentField.show();
    textError.remove();

    state.reactionElements.forEach((el) => el.update(el.name === state.reaction));

    if (state.currentCommentOptions) {
      state.currentCommentOptions.onInput = handleCommentInput;
    }
    
    commentField.update(state.currentCommentOptions);
    submitBtn.update({
      onSubmit: handleSubmit, 
      isVisible: !!state.reaction, 
      isDisabled: !state.isSubmitDisabled,
    });
  }

  const feedbackHandler = {
    comment: onCommentChange,
    reaction: onReactionChange,
  }

  const feedback = UIComponent({
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
            children: state.reactionElements,
            class: 'reaction-btns',
          }),
        ],
      }),
      commentField,
      submitBtn,
    ],
  });

  commentField.hide();

  const proxyState = new Proxy(state, {
    set(target, prop, value) {
      target[prop] = value;
      feedbackHandler[prop]?.();
      return true;
    }
  });

  return feedback;
}
