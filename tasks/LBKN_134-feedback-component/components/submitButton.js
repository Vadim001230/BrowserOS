export default function SubmitButton (onSubmit) {
  const submitBtn = document.createElement('button');
  submitBtn.className = 'feedback__submit-btn';
  submitBtn.textContent = 'Submit';
  submitBtn.setAttribute('name', 'submit');

  const textError = document.createElement('span');
  submitBtn.addEventListener('click', (e) =>  {
    onSubmit(e, submitBtn.form).catch(() => {
      textError.remove();
      textError.style.color = 'red';
      textError.textContent = 'An error has occurred. Try again';
      submitBtn.before(textError);
    });
  });

  return submitBtn;
}
