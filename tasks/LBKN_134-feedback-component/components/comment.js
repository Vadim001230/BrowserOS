import changeElementHeight from '../utils/elementHeight.js'

export default function TextField(options, isEmptyTextLength) {
  const commentContainer = document.createElement('div');
  commentContainer.className = 'comment-container';

  const subtitle = document.createElement('p');
  subtitle.textContent = options.subtitle;
  commentContainer.append(subtitle);

  const textarea = document.createElement('textarea');
  textarea.className = 'textarea';
  const attributes = {
    type: 'text',
    name: 'text',
    placeholder: options.placeholder || '',
    required: Boolean(options.required),
  };

  for (const attr in attributes) {
    textarea.setAttribute(attr, attributes[attr]);
  }

  const handleTextarea = (e) => {
    changeElementHeight(textarea);
    isEmptyTextLength(e.target.value.length === 0);
  };

  textarea.addEventListener('input', handleTextarea);
  
  commentContainer.append(textarea);

  return commentContainer;
}
