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
    this.#observers.forEach((observer) => observer(data));
  }
}
