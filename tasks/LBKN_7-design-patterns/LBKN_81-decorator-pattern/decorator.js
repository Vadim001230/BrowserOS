const input = document.querySelector('.input');
const debouncedInput = document.querySelector('.debounced-input');

const inputHandler = (e) => console.log(e.target.value);

function debounceDecorator(callback, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.call(this, ...args), delay);
  };
}

const debouncedHandle = debounceDecorator(inputHandler, 300);

input.addEventListener('input', inputHandler);
debouncedInput.addEventListener('input', debouncedHandle);
