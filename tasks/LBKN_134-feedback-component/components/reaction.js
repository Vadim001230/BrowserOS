import TextField from './comment.js';

export default function ReactionComponent(controls, initBtn, setDisableBtn) {
  const reactionContainer = document.createElement('div');
  reactionContainer.className = 'reaction-container';

  const reactionBtns = document.createElement('div');
  reactionBtns.className = 'reaction-btns';
  reactionContainer.append(reactionBtns);

  const reactionValue = document.createElement('input');
  reactionValue.setAttribute('name', 'value');
  reactionValue.style.display = 'none';
  reactionContainer.append(reactionValue);

  let comment;
  const handleReactionButton = (e, options, value) => {
    initBtn();
    
    const reactionBtn = e.currentTarget;

    reactionValue.setAttribute('name', 'value');
    reactionValue.value = value;

    reactionBtns.childNodes.forEach((btn) => btn.classList.remove('checked'));
    reactionBtn.classList.add('checked');

    if (!options && !comment) return;
    if (comment) comment.remove();
    if (options) {
      setDisableBtn(options.required);
      const isEmptyTextLength = (isEmpty) => setDisableBtn(isEmpty && options.required);
      comment = TextField(options, isEmptyTextLength);
      
      reactionContainer.after(comment);
    } 
  }

  controls.forEach((control) => {
    const button = control.btn.element;
    button.setAttribute('type', 'button');
    button.addEventListener('click', (e) => handleReactionButton(e, control.commentOptions, control.btn.value));

    reactionBtns.append(button);
  })

  return reactionContainer;
}
