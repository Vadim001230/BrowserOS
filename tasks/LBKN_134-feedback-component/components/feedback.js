import TextField from './comment.js';
import UIComponent from '../UI/UIComponent.js';
import FeedbackConstructor from './feedbackConstructor.js';

export default function FeedbackComponent ({ title, onSubmit, controls }) {
  const state = {
    comment: '',
    reaction: ''
  }
  const reactionElements = [];
  const feedbackOptions = {};
  let commentField;

  controls.forEach((control, index) => {
    reactionElements.push(control.element({ click: (e) => handleReactionElement(e) }));
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

  const feedback = FeedbackConstructor(title, reactionElements, handleSubmit);
  const submitBtn = feedback.submit;

  const setState = (value) => Object.keys(value).forEach((key) => proxyState[key] = value[key]);

  const handleComment = (e) => setState({ comment : e.target.value });
  const handleReactionElement = (e) => setState({ reaction : e.currentTarget.name });

  const setDisableSubmitBtn = (isDisabled) => {
    isDisabled ? submitBtn.setAttribute('disabled', true) : submitBtn.removeAttribute('disabled');
  }

  const stateHandlerConfig = {
    set(target, prop, value) {
      if (prop === 'comment') {
        const isCommentRequired = feedbackOptions[state.reaction].required;
        setDisableSubmitBtn(value.length === 0 && isCommentRequired);
      }

      if (prop === 'reaction') {
        submitBtn.classList.add('block');
        submitBtn.removeAttribute('disabled');
        reactionElements.forEach((el) => 
          el.name === value ? el.classList.add('checked') : el.classList.remove('checked')
        );

        const options = feedbackOptions[value];
        if (commentField) commentField.remove();
        if (options) {
          setDisableSubmitBtn(options.required);
          commentField = TextField(options, handleComment);
          submitBtn.before(commentField);
        }
      }

      target[prop] = value;
      return true;
    }
  }

  const proxyState = new Proxy(state, stateHandlerConfig);

  return feedback;
}
