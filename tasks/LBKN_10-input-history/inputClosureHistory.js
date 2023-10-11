function  createInputHistoryComponent(node, initValue = '') {
  const inputElement = node.querySelector('.history-input_field');
  const prevBtn = node.querySelector('.history-input_prev-btn');
  const nextBtn = node.querySelector('.history-input_next-btn');
  const history = [initValue];
  let currentIndex = 0;

  const updateHistory = () => history.splice(currentIndex + 1);
  const setInputValue = (value) => inputElement.value = value;
  const setCurrentIndex = (value) => currentIndex = value;

  function inputHandler(value) {
    updateHistory();
    history.push(value);
    setCurrentIndex(history.length - 1);
  }

  function nextBtnHandler() {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setInputValue(history[currentIndex]);
    }
  }

  function prevBtnHandler() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setInputValue(history[currentIndex]);
    }
  }

  function initListeners() {
    inputElement.addEventListener('change', function(event) {
      inputHandler(event.target.value);
    });
    prevBtn.addEventListener('click', prevBtnHandler);
    nextBtn.addEventListener('click', nextBtnHandler);
  }

  function init() {
    inputElement.value = history[0];
    initListeners();
  }
  
  init()
}

const historyInputComponentsList = document.querySelectorAll('.history-input'); 
historyInputComponentsList.forEach((node) => createInputHistoryComponent(node))
