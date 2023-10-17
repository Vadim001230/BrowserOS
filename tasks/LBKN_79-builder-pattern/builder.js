class Task {
  constructor() {
    this.text = '';
    this.deadline = new Date();
    this.interval = 'once';
    this.comleted = false;
  }
}

class TaskBuilder {
  constructor(Task) {
    this.task = new Task;
  }
  
  setText(text) {
    this.task.text = text;
    return this;
  }

  setDeadline(deadline) {
    this.task.deadline = deadline;
    return this;
  }

  setInterval(interval) {
    this.task.interval = interval;
    return this;
  }

  setComleted(comleted) {
    this.task.comleted = comleted;
    return this;
  }

  build() {
    return this.task;
  }
}

const task = new TaskBuilder(Task)
  .setText('Реализовать паттерн Builder')
  .setDeadline(new Date('October 20, 2023'))
  .setComleted(true)
  .build();

console.log(task)
