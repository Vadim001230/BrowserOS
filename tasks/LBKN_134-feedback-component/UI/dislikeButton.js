export default function DislikeButton() {
  const btn = document.createElement('button');
  btn.className = 'feedback__dislike';
  const btnImg = document.createElement('img');
  btnImg.src = './UI/icons/dislike.svg';
  btnImg.setAttribute('alt', 'dislike');
  btn.append(btnImg);

  return btn;
}
