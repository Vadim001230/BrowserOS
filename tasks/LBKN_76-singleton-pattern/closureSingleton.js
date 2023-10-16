const Singleton = (() => {
  let instance = null;

  return class Singleton {
    constructor() {
      if (instance === null) {
        instance = this;
      }
      return instance;
    }
  }
})();

console.log(new Singleton() === new Singleton())
