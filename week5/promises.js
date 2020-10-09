function doSomething(data, successCallback, failCallback) {
  setTimeout(() => {
    data ? secondDoer(data, successCallback, failCallback) : failCallback('On No I failed!');
  }, 500)
}

// doSomething(true, console.log, console.error);

let promise = (data) => {
  return new Promise ((resolve, reject) => {
    console.log('Created the promise!');
    setTimeout(() => {
      data ? resolve('Everything was ok in my promise!') : reject('On No the promise failed!');
    }, 500)
  })
}

// let p = promise(true);
//
// setTimeout(() => {
//   console.log('resolving!');
//   p.then(console.log)
//       .catch(console.error);
// }, 1000);
//

function secondDoer(data, successCallback, failCallback) {
  setTimeout(() => {
    data ? successCallback('Everything was ok in my secondDoer!') : failCallback('On No the secondDoer failed!');
  }, 500)
}

let p = promise(true);

p.then(resp => {
  console.log('All good in the first promise!');
  return promise(true)
})
.then(resp => {
  console.log('All good in the second promise!');
})