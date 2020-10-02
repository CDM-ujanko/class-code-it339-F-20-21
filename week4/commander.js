'use strict'

let program = require('commander');

program
  .version('0.0.1')
  .description('My very cool command line util.');

program
    .option('-p, --pizza <pizza>', 'pizza [pizza]');

program
    .command('greet [name]')
    .description('Says hello!')
    .action((name) => {
      console.log(`Hello ${name}`)
    });

program.parse(process.argv);

console.log(program.pizza);

