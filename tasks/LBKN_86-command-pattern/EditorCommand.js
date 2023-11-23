class EditorCommand {
  constructor(editor) {
    this.editor = editor;
    this.previousContent = this.editor.content;
  }

  undo() {
    this.editor.content = this.previousContent;
  }
}

export class BoldCommand extends EditorCommand {
  execute() {
    this.editor.boldSelection();
  }
}

export class ItalicCommand extends EditorCommand {
  execute() {
    this.editor.italicSelection();
  }
}
