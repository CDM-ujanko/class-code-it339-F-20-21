'use strict'

const net = require('net'),
    port = process.argv[2];

console.log(port);
if (!port) {
  throw Error('A port must be provided');
}

let connections = [];

net.createServer((conn) => {
  console.log('A client connected!');
  conn.write('Welcome to IT339 chat!\nWhat is your name?\n');
  connections.push(conn);

  conn.on('data', (data) => {
    console.log(data.toString());
    if (!conn.name) {
      conn.name = data.toString();
    } else {
      broadcast(conn.name, data.toString());
    }
  });

  conn.on('end', (event) => {
    broadcast(null, `${conn.name} Left the chat!\n`);
    connections.splice(connections.indexOf(conn), 1);
  });

  conn.on('error', (error) => {
    console.log(error)
  });

}).listen(port, () => {
  console.log(`Listening on port ${port}`);
});

function broadcast(name, message) {
  let time = new Date().toISOString();
  connections.forEach((conn) => {
    conn.write(`${name} ${time}: ${message}`);
  });
}
