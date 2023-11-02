import ReactionComponent from './reaction.js';
import SubmitButton from './submitButton.js';

export default function FeedbackComponent ({ title, onSubmit, controls }) {
  const feedbackForm = document.createElement('form');
  feedbackForm.className = 'feedback__form';

  const reactionContainer = ReactionComponent(controls);

  const titleEl = document.createElement('h3');
  titleEl.className = 'feedback__title';
  titleEl.textContent = title;
  reactionContainer.prepend(titleEl);

  const submitBtn = SubmitButton(onSubmit);

  feedbackForm.append(reactionContainer);
  feedbackForm.append(submitBtn);

  return feedbackForm;
}
