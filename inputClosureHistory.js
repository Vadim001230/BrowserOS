function  createInputHistoryComponent(node, initValue = '') {
  const inputElement = node.querySelector('.history-input_field');
  const prevBtn = node.querySelector('.history-input_prev-btn');
  const nextBtn = node.querySelector('.history-input_next-btn');
  const history = [initValue];
  let currentIndex = 0;

  function inputHandler(value) {
    history.splice(currentIndex + 1);
    history.push(value);
    currentIndex = history.length - 1;
  }
  
  const setInputValue = (value) => inputElement.value = value;

  function nextBtnHandler() {
    if (currentIndex < history.length - 1) {
      currentIndex++;
      setInputValue(history[currentIndex]);
    }
  }

  function prevBtnHandler() {
    if (currentIndex > 0) {
      currentIndex--;
      setInputValue(history[currentIndex]);
    }
  }

  function init() {
    inputElement.value = history[0];
    inputElement.addEventListener('change', function(event) {
      inputHandler(event.target.value);
    });
    prevBtn.addEventListener('click', prevBtnHandler);
    nextBtn.addEventListener('click', nextBtnHandler);
  }

  init()
}

const historyInputComponentsList = document.querySelectorAll('.history-input'); 
historyInputComponentsList.forEach((node) => createInputHistoryComponent(node))
