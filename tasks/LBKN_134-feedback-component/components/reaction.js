import CommentComponent from './comment.js';

export default function ReactionComponent(controls) {
  const reactionContainer = document.createElement('div');
  reactionContainer.className = 'reaction-container';

  const reactionBtns = document.createElement('div');
  reactionBtns.className = 'reaction-btns';
  reactionContainer.append(reactionBtns);

  let comment;
  function handleButton(commentOptions, e) {
    const reactionBtn = e.currentTarget;
    const reactionBtns = reactionBtn.parentNode.childNodes;
    reactionBtns.forEach((btn) => btn.classList.remove('checked'));
    reactionBtn.classList.add('checked');

    const submitBtn = reactionBtn.form.submit;
    submitBtn.style.display = 'block';
    submitBtn.removeAttribute('disabled')

    if (!commentOptions && !comment) return;
    if (comment) comment.remove();
    if (commentOptions) {
      commentOptions.required ? submitBtn.setAttribute('disabled', true) : null;
      comment = CommentComponent(commentOptions);
      reactionContainer.after(comment);
    } 
  }

  controls.forEach((control) => {
    const button = control.btn;
    button.setAttribute('type', 'button');
    button.addEventListener('click', (e) => handleButton(control.commentOptions, e));

    reactionBtns.append(button);
  })

  return reactionContainer;
}
