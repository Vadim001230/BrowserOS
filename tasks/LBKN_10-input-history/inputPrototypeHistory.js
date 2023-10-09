class InputPrototypeHistory {
  constructor(node, initValue = '') {
    this.inputElement = node.querySelector('.history-input_field');
    this.prevBtn = node.querySelector('.history-input_prev-btn');
    this.nextBtn = node.querySelector('.history-input_next-btn');
    this.history = [initValue];
    this.currentIndex = 0;
  }

  inputHandler(value) {
    this.history.splice(this.currentIndex + 1);
    this.history.push(value);
    this.currentIndex = this.history.length - 1;
  }

  nextBtnHandler() {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      this.inputElement.value = this.history[this.currentIndex];
    }
  }

  prevBtnHandler() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.inputElement.value = this.history[this.currentIndex];
    }
  }

  init() {
    this.inputElement.value = this.history[0];
    this.inputElement.addEventListener('change', (event) => {
      this.inputHandler(event.target.value);
    });
    this.prevBtn.addEventListener('click', this.prevBtnHandler.bind(this));
    this.nextBtn.addEventListener('click', this.nextBtnHandler.bind(this));
  }
}

const historyInputComponentsList = document.querySelectorAll('.history-input'); 
historyInputComponentsList.forEach((node) => (new InputPrototypeHistory(node)).init())
