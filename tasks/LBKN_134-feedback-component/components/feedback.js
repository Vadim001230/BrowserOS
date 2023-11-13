import TextField from './comment.js';
import SubmitBtn from './submitBtn.js';
import UIComponent from '../UI/UIComponent.js';

export default function FeedbackComponent({ title, onSubmit, controls }) {
  const state = {
    comment: '',
    reaction: '',
  }
  const reactionElements = [];
  const feedbackOptions = {};

  const setState = (value) => Object.keys(value).forEach((key) => proxyState[key] = value[key]);

  const handleClickReactionElement = (e) => setState({ reaction: e.currentTarget.name, comment: '' });
  const handleInputComment = (e) => setState({ comment: e.target.value });

  const textError = UIComponent({
    tag: 'span',
    children: ['An error has occurred. Try again'],
    style: 'color: red',
  });

  const handleSubmit = (e) => {
    onSubmit(e, state).catch(() => {
      textError && textError.remove();
      feedback.append(textError);
    });
  };

  const submitBtn = SubmitBtn();
  const commentField = TextField();

  controls.forEach((control, index) => {
    const reactionElement = control.element({ click: handleClickReactionElement });
    reactionElements.push(reactionElement);
    const reaction = reactionElements[index].name;
    feedbackOptions[reaction] = control.commentOptions || null;
  });

  const feedbackHandler = {
    comment: (value) => {
      const isCommentRequired = feedbackOptions[state.reaction]?.required;
      const isDisabled = value.length === 0 && isCommentRequired;
      submitBtn.update({
        onSubmit: handleSubmit, 
        isVisible: true, 
        isDisabled: isDisabled
      });
      textError.remove();
    },

    reaction: (value) => {
      commentField.style.display = 'block';
      reactionElements.forEach((el) => el.update(value));
      const options = feedbackOptions[value];
      textError.remove();
      if (options) {
        options.onInput = handleInputComment;
      }
      
      commentField.update(options);
      submitBtn.update({
        onSubmit: handleSubmit, 
        isVisible: true, 
        isDisabled: options?.required
      });
    },
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
            children: reactionElements,
            class: 'reaction-btns',
          }),
        ],
      }),
      commentField,
      submitBtn,
    ],
  });

  commentField.style.display = 'none';

  const proxyState = new Proxy(state, {
    set(target, prop, value) {
      feedbackHandler[prop](value);
      target[prop] = value;
      return true;
    }
  });


  return feedback;
}
