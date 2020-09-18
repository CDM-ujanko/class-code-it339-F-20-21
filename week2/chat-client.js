'use strict'

const net = require('net'),
    readline = require('readline'),
    hostname = process.argv[2],
    port = process.argv[3];

if (!hostname) {
  throw Error('A port must be provided');
}

if (!port) {
  throw Error('A port must be provided');
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const client = net.connect({host: hostname, port: port});

client.on('data', (data) => {
  console.log(data.toString());
})

rl.on('line', (input => {
  client.write(input);
}))

