function expensiveOperation(num) {
  console.log(`Выполняется дорогостоящая операция для ${num}`);
  return num * 10000;
}

class CacheProxy {
  constructor(func) {
    this.func = func;
    this.cache = new Map();
  }

  checkCache(num) {
    if (this.cache.has(num)) {
      console.log(`Результат для ${num} взят из кеша`);
      return this.cache.get(num);
    } else {
      const result = this.func(num);
      this.cache.set(num, result);
      return result;
    }
  }
}

const cachedOperation = new CacheProxy(expensiveOperation);

console.log(cachedOperation.checkCache(2));
console.log(cachedOperation.checkCache(10));
console.log(cachedOperation.checkCache(2));
console.log(cachedOperation.checkCache(10));
