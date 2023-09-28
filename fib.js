const fibonacci = document.querySelector('.fibonacci');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let namberOfFib = 1;
let fib = 0;

function findFib(n) {
  if (n === 1) return 0;
  let prev = 0;
  let next = 1;
  for (let i = 3; i <= n; i++) {
    let current = prev + next;
    prev = next;
    next = current;
  }
  return next;
}

function getFib(type) {
  type === 'next' ? namberOfFib++ : namberOfFib--;
  if (namberOfFib <= 1) {
    namberOfFib = 1;
  }
  fib = findFib(namberOfFib);
  fibonacci.textContent = fib.toString();
}

nextBtn.addEventListener('click', () => getFib('next'));
prevBtn.addEventListener('click', () => getFib('prev'));
