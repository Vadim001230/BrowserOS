class InputPrototypeHistory {
  constructor(inputId) {
    this.inputElement = document.getElementById(inputId);
    this.history = [''];
    this.currentIndex = 0;

    this.inputElement.addEventListener('change', (event) => {
      this.addToHistory(event.target.value);
    });
  }

  addToHistory(value) {
    this.history.splice(this.currentIndex + 1);
    this.history.push(value);
    this.currentIndex = this.history.length - 1;
  }

  prevChange() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.inputElement.value = this.history[this.currentIndex];
    }
  }

  nextChange() {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      this.inputElement.value = this.history[this.currentIndex];
    }
  }
}

const prevBtn1 = document.querySelector('.prevBtn1');
const nextBtn1 = document.querySelector('.nextBtn1');
const prevBtn2 = document.querySelector('.prevBtn2');
const nextBtn2 = document.querySelector('.nextBtn2');

const input1 = new InputPrototypeHistory('input1');
const input2 = new InputPrototypeHistory('input2');

prevBtn1.onclick = () => input1.prevChange();
nextBtn1.onclick = () => input1.nextChange();
prevBtn2.onclick = () => input2.prevChange();
nextBtn2.onclick = () => input2.nextChange();
