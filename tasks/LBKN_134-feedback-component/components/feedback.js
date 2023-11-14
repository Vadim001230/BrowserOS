import TextField from './comment.js';
import SubmitBtn from './submitBtn.js';
import UIComponent from '../UI/UIComponent.js';

const textError = UIComponent({
  tag: 'span',
  children: ['An error has occurred. Try again'],
  style: 'color: red',
});

const createCommentField = () => {
  const el = TextField();
  el.show = () => el.style.display = 'block';
  el.hide = () => el.style.display = 'none';

  return el;
};

const submitBtn = SubmitBtn();
const commentField = createCommentField();

export function FeedbackComponent({ title, onSubmit, controls }) {
  const state = {
    comment: '',
    reaction: '',
    reactionElements: [],
    feedbackOptions: {},

    get currentOptions() {
      return this.feedbackOptions[this.reaction];
    },

    get isCommentValid() {
      return this.comment.length > 0 && !!this.reaction;
    },

    get isSubmitDisabled() {
      return !this.isCommentValid && this.currentOptions?.required;
    }
  };

  const handleClickReaction = (e) => {
    proxyState.reaction = e.currentTarget.name; 
    proxyState.comment = '';
  }

  const handleInputComment = (e) => proxyState.comment = e.target.value;

  const handleSubmit = (e) => {
    onSubmit(e, { reaction: state.reaction, comment: state.comment }).catch(() => {
      textError && textError.remove();
      feedback.append(textError);
    });
  };

  controls.forEach((control) => {
    state.reactionElements.push(control.element({ click: handleClickReaction }));
    state.feedbackOptions[control.id] = control.commentOptions || null;
  });

  const onCommentChange = () => {
    submitBtn.update({
      onSubmit: handleSubmit, 
      isVisible: !!state.reaction, 
      isDisabled: state.isSubmitDisabled,
    });

    textError.remove();
  }

  const onReactionChange = () => {
    commentField.show();
    textError.remove();

    state.reactionElements.forEach((el) => el.update(el.name === state.reaction));

    if (state.currentOptions) {
      state.currentOptions.onInput = handleInputComment;
    }
    
    commentField.update(state.currentOptions);
    submitBtn.update({
      onSubmit: handleSubmit, 
      isVisible: !!state.reaction, 
      isDisabled: state.isSubmitDisabled,
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
      feedbackHandler[prop]();
      return true;
    }
  });

  return feedback;
}
