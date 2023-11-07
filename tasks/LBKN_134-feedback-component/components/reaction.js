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
  const handleReactionButton = (e, options) => {
    initBtn();
    const value = e.currentTarget.name;
    reactionValue.value = value;
    reactionBtns.childNodes.forEach((btn) => btn.classList.remove('checked'));
    e.currentTarget.classList.add('checked');

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
    const button = control.btn((e) => handleReactionButton(e, control.commentOptions));

    reactionBtns.append(button);
  })

  return reactionContainer;
}
