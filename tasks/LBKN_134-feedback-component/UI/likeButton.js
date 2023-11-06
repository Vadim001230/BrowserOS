export default function DislikeButton() {
  const btn = document.createElement('button');
  btn.className = 'feedback__like';
  const btnImg = document.createElement('img');
  btnImg.src = './UI/icons/like.svg';
  btnImg.setAttribute('alt', 'like');
  btn.append(btnImg);

  return btn;
}
