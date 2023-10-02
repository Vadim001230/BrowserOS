function inputClosureHistory(inputId) {
  const inputElement = document.getElementById(inputId);
  const history = [''];
  let currentIndex = 0;

  function addToHistory(value) {
    history.splice(currentIndex + 1);
    history.push(value);
    currentIndex = history.length - 1;
  }

  inputElement.addEventListener('change', function(event) {
    addToHistory(event.target.value);
  });

  function prevChange() {
    if (currentIndex > 0) {
      currentIndex--;
      inputElement.value = history[currentIndex];
    }
  }

  function nextChange() {
    if (currentIndex < history.length - 1) {
      currentIndex++;
      inputElement.value = history[currentIndex];
    }
  }

  return { prevChange, nextChange };
}

const prevBtn1 = document.querySelector('.prevBtn1');
const nextBtn1 = document.querySelector('.nextBtn1');
const prevBtn2 = document.querySelector('.prevBtn2');
const nextBtn2 = document.querySelector('.nextBtn2');

const input1 = inputClosureHistory('input1');
const input2 = inputClosureHistory('input2');

prevBtn1.onclick = () => input1.prevChange();
nextBtn1.onclick = () => input1.nextChange();
prevBtn2.onclick = () => input2.prevChange();
nextBtn2.onclick = () => input2.nextChange();
