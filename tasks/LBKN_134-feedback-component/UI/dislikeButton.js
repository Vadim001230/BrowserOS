export default function DislikeButton() {
  const btn = document.createElement('button');
  btn.className = 'feedback__dislike';
  btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#A7ACB2"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4" d="M8 14V4m0 10H4V4h4m0 10 5.196 6.061a2 2 0 0 0 2.003.64l.048-.013a2 2 0 0 0 1.179-3.05L14 14h4.56a2 2 0 0 0 1.962-2.392l-1.2-6A2 2 0 0 0 17.36 4H8"/></svg>';

  return btn;
}
