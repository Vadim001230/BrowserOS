export default function CommentComponent(options) {
  const commentContainer = document.createElement('div');
  commentContainer.className = 'comment-container';

  const subtitle = document.createElement('p');
  subtitle.textContent = options.subtitle;
  commentContainer.append(subtitle);

  const handleFeedbackText = (e) => {
    feedbackText.style.height = feedbackText.scrollTop > 0 ? feedbackText.scrollHeight + 'px' : 'auto';
    
    const submitBtn = e.target.form.submit;
    if (e.target.value.length === 0) {
      submitBtn.setAttribute('disabled', true);
    } else {
      submitBtn.removeAttribute('disabled');
    }
  };

  const feedbackText = document.createElement('textarea');
  feedbackText.className = 'feedback__text';
  feedbackText.setAttribute('type', 'text');
  feedbackText.setAttribute('name', 'text');
  feedbackText.setAttribute('placeholder', options.placeholder || '');
  feedbackText.setAttribute('required', options.required || false);

  feedbackText.addEventListener('keyup', handleFeedbackText);
  
  commentContainer.append(feedbackText);

  return commentContainer;
}
