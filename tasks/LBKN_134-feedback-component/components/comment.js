import changeElementHeight from '../utils/elementHeight.js'

export default function TextField(options, isEmptyTextLength) {
  const commentContainer = document.createElement('div');
  commentContainer.className = 'comment-container';

  const subtitle = document.createElement('p');
  subtitle.textContent = options.subtitle;
  commentContainer.append(subtitle);

  const textarea = document.createElement('textarea');
  textarea.className = 'textarea';
  textarea.setAttribute('type', 'text');
  textarea.setAttribute('name', 'text');
  textarea.setAttribute('placeholder', options.placeholder || '');
  if (Boolean(options.required)) {
    textarea.setAttribute('required', true);
  } else {
    textarea.removeAttribute('required');
  }


  const handleTextarea = (e) => {
    changeElementHeight(textarea);
    isEmptyTextLength(e.target.value.length === 0);
  };

  textarea.addEventListener('input', handleTextarea);
  
  commentContainer.append(textarea);

  return commentContainer;
}
