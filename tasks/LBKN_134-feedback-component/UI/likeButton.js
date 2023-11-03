export default function LikeButton() {
  const btn = document.createElement('button');
  btn.className = 'feedback__like';
  btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#A7ACB2"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4" d="M8 10v10m0-10H4v10h4m0-10 5.196-6.062a2 2 0 0 1 2.003-.638l.048.012a2 2 0 0 1 1.179 3.05L14 10h4.56a2 2 0 0 1 1.962 2.392l-1.2 6A2 2 0 0 1 17.36 20H8"/></svg>';

  return btn;
}
