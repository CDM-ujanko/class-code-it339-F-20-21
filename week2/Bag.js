class Bag {
  constructor() {
    this.items = [];
  }

  put(item) {
    this.items.push(item);
  }

  take() {
    return this.items.pop();
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

// let bag = new Bag();
// console.log(Bag);
// console.log(bag.items);
//
// bag.put('jar');
// bag.put(7);
// console.log(bag.items);
// console.log(bag.isEmpty());
// console.log(bag.take());
// console.log(bag.items);

module.exports = Bag;