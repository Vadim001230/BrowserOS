import likeIcon from './icons/likeIcon.js';
import dislikeIcon from './icons/dislikeIcon.js';

export default function UIButton(value) {
  const btn = document.createElement('button');
  if (value === 'like') {
    btn.className = 'feedback__like';
    btn.innerHTML = likeIcon;
  } else if (value === 'dislike') {
    btn.className = 'feedback__dislike';
    btn.innerHTML = dislikeIcon;
  }

  return btn;
}
