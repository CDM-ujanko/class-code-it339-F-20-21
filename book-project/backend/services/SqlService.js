const myslq = require('mysql'),
    bcrypt = require('bcrypt');

require('dotenv').config()

class SqlService {
  constructor() {
    this.connection = myslq.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'it339'
    })

    this.createUsersTable();
    this.crateBundleTable();
  }

  crateBundleTable() {
    this.connection.query(`CREATE TABLE IF NOT EXISTS bundles (
      id INT NOT NULL AUTO_INCREMENT,
      user VARCHAR(255) NOT NULL,
      name VARCHAR(100) NOT NULL,
      description VARCHAR(255) NOT NULL,
      books VARCHAR(255),
      PRIMARY KEY (id),
      FOREIGN KEY (user) REFERENCES users(email)
    )`, (error, results, filed) => {
      // console.log(error, results, filed)
    });
  }

  createUsersTable() {
    this.connection.query(`CREATE TABLE IF NOT EXISTS users (
      id INT NOT NULL AUTO_INCREMENT,
      email VARCHAR(255) NOT NULL UNIQUE, 
      firstName VARCHAR(100) NOT NULL,
      lastName VARCHAR(100) NOT NULL,
      password VARCHAR(255) NOT NULL,
      PRIMARY KEY (id)
    )`, (error, results, filed) => {
      // console.log(error, results, filed)
      let user = {
        firstName: 'Bob',
        lastName: 'Belcher',
        email: 'bob@aol.com',
        password: 'password',
      }
        this.createUser(user, (err) => {
          if (err) {
            console.log(err);
          }
        })
    });
  }

  getBundles(email, callback) {
   this.connection.query(`SELECT * FROM bundles WHERE user = ?`, [email], callback);
  }

  getBundle(id, callback) {
    this.connection.query(`SELECT * FROM bundles WHERE id = ?`,[id], callback);
  }

  createBundle(bundle, callback) {
    console.log(bundle);
    this.connection.query(`INSERT INTO bundles SET ?`, bundle, callback);
  }

  createUser(user, callback) {
    // TODO: use .env file
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) {
        throw err;
      }
      user.password = hash;
      this.connection.query(`INSERT IGNORE INTO users SET ?`, user, callback);
    });
  }

  getUsers(callback) {
    this.connection.query(`SELECT id, firstname, email, lastName  FROM users`, callback);
  }

  getUser(email, callback) {
    this.connection.query(`SELECT * FROM users WHERE email = ?`,[email], callback);
  }
}

module.exports = new SqlService();

