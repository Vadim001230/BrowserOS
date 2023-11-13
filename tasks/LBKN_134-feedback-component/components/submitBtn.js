import UIButton from '../UI/UIButton.js';

const SubmitBtn = (options) => {
  const createSubmitBtn = (options) => UIButton({
    children: ['Submit'],
    class: 'feedback__submit-btn',
    name: 'submit',
    type: 'submit',
    listeners: { click: options?.onSubmit },
    style: `display: ${options?.isVisible ? 'block' : 'none'}`,
    ...(options?.isDisabled && { disabled: 'disabled' }),
  });

  let submitBtn = createSubmitBtn(options);

  submitBtn.update = ((options) => {
    const parent = submitBtn.parentNode;
    submitBtn.remove();
    submitBtn = createSubmitBtn(options);
    parent.append(submitBtn);
  });

  return submitBtn;
}

export default SubmitBtn;
