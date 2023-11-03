import TextField from './comment.js';

export default function ReactionComponent(controls) {
  const reactionContainer = document.createElement('div');
  reactionContainer.className = 'reaction-container';

  const reactionBtnsContainer = document.createElement('div');
  reactionBtnsContainer.className = 'reaction-btns';
  reactionContainer.append(reactionBtnsContainer);

  const reactionValue = document.createElement('input');
  reactionValue.setAttribute('name', 'value');
  reactionValue.style.display = 'none';
  reactionContainer.append(reactionValue);

  let comment;
  const handleReactionButton = (e, commentOptions, value) => {
    const reactionBtn = e.currentTarget;

    reactionValue.setAttribute('name', 'value');
    reactionValue.value = value;

    const reactionBtns = reactionBtn.parentNode.childNodes;
    reactionBtns.forEach((btn) => btn.classList.remove('checked'));
    reactionBtn.classList.add('checked');

    const submitBtn = reactionBtn.form.submit;
    submitBtn.classList.add('block');
    submitBtn.removeAttribute('disabled');
    
    if (!commentOptions && !comment) return;
    if (comment) comment.remove();
    if (commentOptions) {
      commentOptions.required ? submitBtn.setAttribute('disabled', true) : null;
      comment = TextField(commentOptions);
      reactionContainer.after(comment);
    } 
  }

  controls.forEach((control) => {
    const button = control.btn.element;
    button.setAttribute('type', 'button');
    button.addEventListener('click', (e) => handleReactionButton(e, control.commentOptions, control.btn.value));

    reactionBtnsContainer.append(button);
  })

  return reactionContainer;
}
