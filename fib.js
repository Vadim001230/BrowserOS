const fibonacci = document.querySelector('.fibonacci');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let nomberOfFib = 1;
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

function nextFib() {
  nomberOfFib++;
  fib = findFib(nomberOfFib);
  fibonacci.innerHTML = fib.toString();
}

function prevFib() {
  nomberOfFib--;
  if (nomberOfFib <= 1) {
    nomberOfFib = 1;
  }
  fib = findFib(nomberOfFib);
  fibonacci.innerHTML = fib;
}

nextBtn.addEventListener('click', nextFib);
prevBtn.addEventListener('click', prevFib);
