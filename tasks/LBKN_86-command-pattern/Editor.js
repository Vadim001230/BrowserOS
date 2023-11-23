export class Editor {
  constructor(textareaElement) {
    this.textareaElement = textareaElement;
  }

  get content() {
    return this.textareaElement.value;
  }

  set content(value) {
    this.textareaElement.value = value;
  }

  get startSelection() {
    return this.textareaElement.selectionStart;
  }

  get endSelection() {
    return this.textareaElement.selectionEnd;
  }

  get selectedText() {
    return this.content.slice(this.startSelection, this.endSelection);
  }
  
  wrapSelectionWith(wrapperStart, wrapperEnd) {
    if (this.startSelection === this.endSelection) return;

    const textBeforeSelection = this.content.slice(0, this.startSelection);
    const textAfterSelection = this.content.slice(this.endSelection);
    const wrappedText = wrapperStart + this.selectedText + wrapperEnd;
    this.content = textBeforeSelection + wrappedText + textAfterSelection;
  }

  boldSelection() {
    this.wrapSelectionWith('<b>', '</b>');
  }

  italicSelection() {
    this.wrapSelectionWith('<i>', '</i>');
  }
}
