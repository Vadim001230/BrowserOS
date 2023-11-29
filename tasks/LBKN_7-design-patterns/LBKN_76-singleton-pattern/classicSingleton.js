class Singleton {
  static _instance = null;

  constructor() {
    if (!Singleton._instance) {
      Singleton._instance = this;
    }
    return Singleton._instance;
  }
}

console.log(new Singleton() === new Singleton())
