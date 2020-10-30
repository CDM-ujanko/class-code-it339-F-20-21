const myslq = require('mysql');

class SqlService {
  constructor() {
    console.log('Constructor!', process.env);
    this.connection = myslq.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'it339'
    })

    this.crateBundleTable();
  }

  crateBundleTable() {
    this.connection.query(`CREATE TABLE IF NOT EXISTS bundles (
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL,
      description VARCHAR(255) NOT NULL,
      books VARCHAR(255),
      PRIMARY KEY (id)
    )`, (error, results, filed) => {
      console.log(error, results, filed)
    });
  }

  getBundles(callback) {
   this.connection.query(`SELECT * FROM bundles`, callback);
  }

  getBundle(id, callback) {
    this.connection.query(`SELECT * FROM bundles WHERE id = ?`,[id], callback);
  }

  createBundle(bundle, callback) {
    console.log(bundle);
    this.connection.query(`INSERT INTO bundles SET ?`, bundle, callback);
  }
}

module.exports = new SqlService();

