export default function SubmitButton (onSubmit) {
  const submitBtn = document.createElement('button');
  submitBtn.className = 'feedback__submit-btn';
  submitBtn.textContent = 'Submit';
  submitBtn.setAttribute('name', 'submit');
  submitBtn.addEventListener('click', (e) => onSubmit(e, submitBtn.form));

  return submitBtn;
}
