class BankAccount {
  constructor(balance) {
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
    console.log(`Внесено: $${amount}. Баланс: $${this.balance}`);
  }

  withdraw(amount) {
    if (amount <= this.balance) {
      this.balance -= amount;
      console.log(`Снято: $${amount}. Баланс: $${this.balance}`);
    } else {
      console.log(`Ошибка: Недостаточно средств.`);
    }
  }
}

class BankAccountProxy {
  constructor(realAccount) {
    this.realAccount = realAccount;
  }

  deposit(amount) {
    if (amount > 1000) {
      console.log(`Ошибка: сумма для внесения слишком большая.`);
    } else {
      this.realAccount.deposit(amount);
    }
  }

  withdraw(amount) {
    if (amount > 500) {
      console.log(`Ошибка: сумма для снятия слишком большая.`);
    } else {
      this.realAccount.withdraw(amount);
    }
  }
}

const realAccount = new BankAccount(1000);
const accountProxy = new BankAccountProxy(realAccount);

accountProxy.deposit(200);
accountProxy.withdraw(400);
accountProxy.withdraw(700);
accountProxy.deposit(2000);
