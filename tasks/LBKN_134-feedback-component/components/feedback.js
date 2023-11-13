import TextField from './comment.js';
import UIComponent from '../UI/UIComponent.js';
import UIButton from '../UI/UIButton.js';

export default function FeedbackComponent({ title, onSubmit, controls }) {
  const state = {
    comment: '',
    reaction: '',
  }
  const reactionElements = [];
  const feedbackOptions = {};
  const commentField = TextField();

  const setState = (value) => Object.keys(value).forEach((key) => proxyState[key] = value[key]);

  const handleClickReactionElement = (e) => setState({ reaction: e.currentTarget.name });
  const handleInputComment = (e) => setState({ comment: e.target.value });

  controls.forEach((control, index) => {
    const reactionElement = control.element({ click: handleClickReactionElement });
    reactionElement.update = ((value) => {
      reactionElement.name === value ? reactionElement.classList.add('checked') : reactionElement.classList.remove('checked');
    });
    reactionElements.push(reactionElement);
    const reaction = reactionElements[index].name;
    feedbackOptions[reaction] = control.commentOptions || null;
  });
  
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
  }

  const createSubmitBtn = (options) => UIButton({
    children: ['Submit'],
    class: `feedback__submit-btn`,
    name: 'submit',
    type: 'submit',
    listeners: { click: handleSubmit },
    style: `display: ${options?.isVisible ? 'block' : 'none'}`,
    ...(options?.isDisabled && { disabled: 'disabled' }),
  });

  let submitBtn = createSubmitBtn();
  submitBtn.update = ((options) => {
    const newBtn = createSubmitBtn(options);
    submitBtn.replaceWith(newBtn);
    newBtn.update = submitBtn.update;
    submitBtn = newBtn;
  });

  const feedbackHandler = {
    comment: (value) => {
      const isCommentRequired = feedbackOptions[state.reaction].required;
      submitBtn.update({ isVisible: true, isDisabled: value.length === 0 && isCommentRequired });
    },

    reaction: (value) => {
      reactionElements.forEach((el) => el.update(value));
      const options = feedbackOptions[value];
      if (options) {
        options.onInput = handleInputComment;
        commentField.update(options);
        submitBtn.update({isVisible: true, isDisabled: options.required});
      } else {
        commentField.update(options);
        submitBtn.update({isVisible: true, isDisabled: false});
      }
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

  const proxyState = new Proxy(state, {
    set(target, prop, value) {
      feedbackHandler[prop](value);
      target[prop] = value;
      return true;
    }
  });

  return feedback;
}
