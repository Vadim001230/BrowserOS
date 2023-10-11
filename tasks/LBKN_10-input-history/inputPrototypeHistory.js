class InputPrototypeHistory {
  constructor(node, initValue = '') {
    this.inputElement = node.querySelector('.history-input_field');
    this.prevBtn = node.querySelector('.history-input_prev-btn');
    this.nextBtn = node.querySelector('.history-input_next-btn');
    this.history = [initValue];
    this.currentIndex = 0;
    this.init();
  }

  updateHistory = () => this.history.splice(this.currentIndex + 1);
  setInputValue = (value) => this.inputElement.value = value;
  setCurrentIndex = (value) => this.currentIndex = value;

  inputHandler(value) {
    this.updateHistory();
    this.history.push(value);
    this.setCurrentIndex(this.history.length - 1);
  }

  nextBtnHandler() {
    if (this.currentIndex < this.history.length - 1) {
      this.setCurrentIndex(this.currentIndex + 1);
      this.setInputValue(this.history[this.currentIndex]);
    }
  }

  prevBtnHandler() {
    if (this.currentIndex > 0) {
      this.setCurrentIndex(this.currentIndex - 1);
      this.setInputValue(this.history[this.currentIndex]);
    }
  }

  initListeners() {
    this.inputElement.addEventListener('change', (event) => {
      this.inputHandler(event.target.value);
    });
    this.prevBtn.addEventListener('click', this.prevBtnHandler.bind(this));
    this.nextBtn.addEventListener('click', this.nextBtnHandler.bind(this));
  }
  
  init() {
    this.inputElement.value = this.history[0];
    this.initListeners();
  }
}

const historyInputComponentsList = document.querySelectorAll('.history-input'); 
historyInputComponentsList.forEach((node) => (new InputPrototypeHistory(node)))
