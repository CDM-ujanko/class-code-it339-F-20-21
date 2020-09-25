'use strict'

const net = require('net')
    port = process.argv[2];

class ChatServer {
  constructor(port) {
    this.connections = [];
    // TODO finish this: Do not forget the error on event.
    this.server = net.createServer((conn) => {
      console.log('A client connected!');
      conn.write('Welcome to IT339 chat!\nWhat is your name?\n');
      this.connections.push(conn);

      conn.on('data', (data) => {
        console.log(data.toString());
        if (!conn.name) {
          conn.name = data.toString();
        } else {
          this.broadcast(conn.name, data.toString());
        }
      });

      conn.on('end', (event) => {
        this.broadcast(null, `${conn.name} Left the chat!\n`);
        this.connections.splice(connections.indexOf(conn), 1);
      });

      conn.on('error', (error) => {
        console.log(error)
      });

    });
    this.server.listen(port, () => {
      console.log(`Listening in port ${port}!`)
    })
  }

  /**
   * Broadcast the message to all the users.
   * @param from
   * @param message
   */
  broadcast(from, message) {
    let time = new Date().toISOString();
    this.connections.forEach((conn) => {
      conn.write(`${from} ${time}: ${message}`);
    });
  }

  /**
   * Close the connection.
   */
  close() {
    this.connections.forEach((conn) => {
      conn.destroy();
    })
    this.server.close();
  }
}

// module.exports = ChatServer;

// For demonstration only.
if (!port) {
  throw Error(`You must provide a port for the chat server!`);
}

let server = new ChatServer(port);