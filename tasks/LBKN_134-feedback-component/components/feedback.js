import TextField from './comment.js';
import UIComponent from '../UI/UIComponent.js';
import UIButton from '../UI/UIButton.js';

export default function FeedbackComponent ({ title, onSubmit, controls }) {
  const reactionElements = controls.map((control) =>
    control.element({ click: (e) => handleReactionButton(e, control.commentOptions) })
  );

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
      UIButton({
        children: ['Submit'],
        class: 'feedback__submit-btn',
        name: 'submit',
        type: 'submit',
      }),
    ],
  });

  const submitBtn = feedback.submit;

  function handleReactionButton (e, options) {
    initSubmitBtn();
    const reactionBtns = e.currentTarget.parentNode;
    reactionBtns.childNodes.forEach((btn) => btn.classList.remove('checked'));
    e.currentTarget.classList.add('checked');

    if (options) {
      setDisableSubmitBtn(options.required);
      const isEmptyTextLength = (isEmpty) => setDisableSubmitBtn(isEmpty && options.required);
      addTextField(options, isEmptyTextLength);
    } 
  }

  const initSubmitBtn = () => {
    submitBtn.classList.add('block');
    submitBtn.removeAttribute('disabled');
  }

  const setDisableSubmitBtn = (isDisabled) => {
    isDisabled ? submitBtn.setAttribute('disabled', true) : submitBtn.removeAttribute('disabled');
  }

  const textError = UIComponent({
    tag: 'span',
    children: ['An error has occurred. Try again'],
    style: 'color: red',
  });

  submitBtn.addEventListener('click', (e) =>  {
    onSubmit(e).catch(() => {
      textError && textError.remove();
      feedback.append(textError);
    });
  });

  let comment;
  const addTextField = (options, isEmptyTextLength) => {
    if (!options && !comment) return;
    if (comment) comment.remove();
    comment = TextField(options, isEmptyTextLength);
    submitBtn.before(comment);
  }

  return feedback;
}
