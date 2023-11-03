export default function TextField(options) {
  const commentContainer = document.createElement('div');
  commentContainer.className = 'comment-container';

  const subtitle = document.createElement('p');
  subtitle.textContent = options.subtitle;
  commentContainer.append(subtitle);

  const autoChangeHeight = () => textarea.style.height = textarea.scrollTop > 0 ? textarea.scrollHeight + 'px' : 'auto';

  const handleTextarea = (e) => {
    autoChangeHeight()
    const submitBtn = e.target.form.submit;
    if (e.target.value.length === 0) {
      submitBtn.setAttribute('disabled', true);
    } else {
      submitBtn.removeAttribute('disabled');
    }
  };

  const textarea = document.createElement('textarea');
  textarea.className = 'feedback__text';
  textarea.setAttribute('type', 'text');
  textarea.setAttribute('name', 'text');
  textarea.setAttribute('placeholder', options.placeholder || '');
  textarea.setAttribute('required',  Boolean(options.required) || false);

  textarea.addEventListener('input', handleTextarea);
  
  commentContainer.append(textarea);

  return commentContainer;
}
