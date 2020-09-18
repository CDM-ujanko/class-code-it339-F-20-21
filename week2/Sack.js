const Bag = require('./Bag');

class Sack extends Bag {
  constructor() {
    super();
  }

  empty() {
    this.items = [];
  }
}

let sack = new Sack();
console.log(Sack);
console.log(sack.items);

sack.put('jar');
sack.put(7);
console.log(sack.items);
console.log(sack.isEmpty());
console.log(sack.take());
console.log(sack.items);
sack.empty();
console.log(sack.isEmpty());
console.log(sack.items);
