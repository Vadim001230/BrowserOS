class Observable {
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

const observable = new Observable();

const observer1 = new Observer('Name1');
const observer2 = new Observer('Name2');

observable.subscribe(observer1);
observable.subscribe(observer2);

observable.notify('Hello world!');

observable.unsubscribe(observer2);

observable.notify('Goodbye world!');
