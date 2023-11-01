import likeIcon from './icons/likeIcon.js';
import dislikeIcon from './icons/dislikeIcon.js';

function FeedbackComponent ({ titleText, subtitleText, commentType, onSubmit, placeholder }) {
  const feedback = document.getElementById('feedback');
  const form = document.createElement('form');
  form.className = 'feedback__form';
  form.setAttribute('action', '')

  const reactionContainer = document.createElement('div');
  reactionContainer.className = 'reaction-container';

  const title = document.createElement('h3');
  title.className = 'feedback__title';
  title.textContent = titleText;
  reactionContainer.prepend(title);

  const reactionBtns = document.createElement('div');
  reactionBtns.className = 'reaction-btns';
  reactionContainer.append(reactionBtns);

  const likeBtn = document.createElement('button');
  likeBtn.className = 'feedback__like';
  likeBtn.innerHTML = likeIcon;
  reactionBtns.prepend(likeBtn);

  const dislikeBtn = document.createElement('button');
  dislikeBtn.className = 'feedback__dislike';
  dislikeBtn.innerHTML = dislikeIcon;
  reactionBtns.append(dislikeBtn);

  const commentContainer = document.createElement('div');
  commentContainer.className = 'comment-container';

  const subtitle = document.createElement('p');
  subtitle.textContent = subtitleText;
  commentContainer.append(subtitle);

  const feedbackText = document.createElement('textarea');
  feedbackText.className = 'feedback__text';
  feedbackText.setAttribute('type', 'text')
  feedbackText.setAttribute('placeholder', placeholder);
  feedbackText.setAttribute('required', true);
  commentContainer.append(feedbackText);

  const sendBtn = document.createElement('button');
  sendBtn.className = 'feedback__send-btn';
  sendBtn.textContent = 'Submit';
  commentContainer.append(sendBtn);

  form.append(reactionContainer);
  form.append(commentContainer);

  feedback.append(form);
}

FeedbackComponent({
  titleText: 'The Rating overview is in beta. Did you find it useful? Let us know!',
  subtitleText: 'Why did you selected useful?',
  placeholder: 'Your feedback...',
  commentType: 'optional',
  onSubmit: () => console.log('submit!'),
})

