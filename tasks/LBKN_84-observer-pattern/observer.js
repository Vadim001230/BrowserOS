class Observeble {
  #observers = [];

  subscribe(observer) {
    this.#observers.push(observer);
  }

  unsubscribe(observer) {
    const index = this.#observers.indexOf(observer);
    if (index !== -1) {
      this.#observers.splice(index, 1);
    }
  }

  notify(data) {
    this.#observers.forEach((observer) => observer.update(data));
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }

  update(data) {
    console.log(`Observer ${this.name} received: ${data}`);
  }
}

const observeble = new Observeble();

const observer1 = new Observer('Name1');
const observer2 = new Observer('Name2');

observeble.subscribe(observer1);
observeble.subscribe(observer2);

observeble.notify('Hello world!');

observeble.unsubscribe(observer2);

observeble.notify('Goodbye world!');
