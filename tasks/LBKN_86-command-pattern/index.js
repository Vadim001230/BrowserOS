import { Editor } from './Editor.js';
import { CommandHistory } from './CommandHistory.js';
import { BoldCommand, ItalicCommand } from './EditorCommand.js';

const init = () => {
  const undo = document.querySelector('.undo');
  const bold = document.querySelector('.bold');
  const italic = document.querySelector('.italic');
  const textarea = document.querySelector('.textarea');
  const preview = document.querySelector('.preview-content');

  const editor = new Editor(textarea);
  const commandManager = new CommandHistory();

  const setPreviewText = () => preview.innerHTML = textarea.value;
  setPreviewText();
  
  bold.addEventListener('click', () => {
    commandManager.execute(new BoldCommand(editor));
    setPreviewText();
  });

  italic.addEventListener('click', () => {
    commandManager.execute(new ItalicCommand(editor));
    setPreviewText();
  });

  undo.addEventListener('click', () => {
    commandManager.undo();
    setPreviewText();
  });

  textarea.addEventListener('input', () => setPreviewText());
}

init();
