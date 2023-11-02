export default function CommentComponent(options) {
  const commentContainer = document.createElement('div');
  commentContainer.className = 'comment-container';

  const subtitle = document.createElement('p');
  subtitle.textContent = options.subtitle;
  commentContainer.append(subtitle);

  const feedbackText = document.createElement('textarea');
  feedbackText.className = 'feedback__text';
  feedbackText.setAttribute('type', 'text');
  feedbackText.setAttribute('placeholder', options.placeholder);
  feedbackText.setAttribute('required', options.required);
  
  feedbackText.addEventListener('keyup', (e) => {
    const submitBtn = e.target.form.submit;
    if (feedbackText.scrollTop > 0) {
      feedbackText.style.height = feedbackText.scrollHeight + 'px';
    } else {
      feedbackText.style.height = 'auto';
    }

    if (e.target.value.length !== 0) {
      submitBtn.removeAttribute('disabled');
    } else {
      submitBtn.setAttribute('disabled', true);
    }
  });
  
  commentContainer.append(feedbackText);

  return commentContainer;
}
