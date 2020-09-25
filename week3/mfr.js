let arr = [1, 22, 56, 78, 103];

let mapResult = arr.map((i) => i * i);
console.log(mapResult, arr);

let filterResult = arr.filter((i) => i > 500);
console.log(filterResult, arr);

let reduceResult = arr.reduce((acc,i) => acc + i, '');
console.log(reduceResult, arr);