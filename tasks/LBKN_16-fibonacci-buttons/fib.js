const fibonacci1 = document.querySelector('.fibonacci1');
const fibonacci2 = document.querySelector('.fibonacci2');
const btn1 = document.querySelector('.btn1');
const btn2 = document.querySelector('.btn2');

function createFibonacciFinder() {
  let prev = 0;
  let next = 1;

  return function() {
      const current = prev + next;
      prev = next;
      next = current;
      return prev;
  }
}

const findFib1 = createFibonacciFinder();
const findFib2 = createFibonacciFinder();

btn1.addEventListener('click', () => {
  fibonacci1.textContent = findFib1();
});

btn2.addEventListener('click', () => {
  fibonacci2.textContent = findFib2();
});
