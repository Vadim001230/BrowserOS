import { UIFactory } from './factory.js';

const state = new Proxy({
  count: 10,
}, {
  set(target, prop, value) {
    target[prop] = value;
    updateCountElement();
    return true;
  },
});

const handlerClickIncrement = () => state.count++;
const handlerClickDecrement = () => state.count--;

const createCountElement = (count) => UIFactory({
  tag: 'p',
  children: [count],
})

let countElement = createCountElement(state.count.toString());

function updateCountElement() {
  countElement.remove()
  countElement = createCountElement(state.count.toString());
  counter.prepend(countElement)
}

const counter = UIFactory({
  tag: 'div',
  children: [
    countElement,
    UIFactory({
      tag: 'button',
      children: ['-'],
      listeners: { click: handlerClickDecrement },
      type: 'button',
      style: 'margin-right: 10px'
    }),
    UIFactory({
      tag: 'button',
      children: ['+'],
      listeners: { click: handlerClickIncrement },
      type: 'button',
    }),
  ],
});

document.body.append(counter);
