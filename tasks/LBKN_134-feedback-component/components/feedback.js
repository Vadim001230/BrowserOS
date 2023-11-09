import ReactionComponent from './reaction.js';
import TextField from './comment.js';

export default function FeedbackComponent ({ title, onSubmit, controls }) {
  const feedbackForm = document.createElement('form');
  feedbackForm.className = 'feedback';

  const titleEl = document.createElement('h3');
  titleEl.className = 'feedback__title';
  titleEl.textContent = title;

  const submitBtn = document.createElement('button');
  submitBtn.className = 'feedback__submit-btn';
  submitBtn.textContent = 'Submit';
  submitBtn.setAttribute('name', 'submit');
  
  const initSubmitBtn = () => {
    submitBtn.classList.add('block');
    submitBtn.removeAttribute('disabled');
  }

  const setDisableSubmitBtn = (isDisabled) => {
    isDisabled ? submitBtn.setAttribute('disabled', true) : submitBtn.removeAttribute('disabled');
  }

  const textError = document.createElement('span');
  submitBtn.addEventListener('click', (e) =>  {
    onSubmit(e, submitBtn.form).catch(() => {
      textError.remove();
      textError.style.color = 'red';
      textError.textContent = 'An error has occurred. Try again';
      submitBtn.before(textError);
    });
  });

  let comment;
  const addTextField = (options, isEmptyTextLength) => {
    if (!options && !comment) return;
    if (comment) comment.remove();
    comment = TextField(options, isEmptyTextLength);
    reactionContainer.after(comment);
  }

  const reactionContainer = ReactionComponent(controls, initSubmitBtn, setDisableSubmitBtn, addTextField);
  
  feedbackForm.append(reactionContainer);
  feedbackForm.append(submitBtn);

  reactionContainer.prepend(titleEl);

  return feedbackForm;
}
