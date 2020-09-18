class Queue {
  constructor() {
    this.items = [];
  }

  enqueue (item) {
    this.items.push(item);
  }

  dequeue() {
    return this.items.shift()
  }

  isEmpty () {
    return this.items.length === 0;
  }

  peek () {
    return this.isEmpty() ? null : this.items[0];
  }
}

module.exports = Queue;
