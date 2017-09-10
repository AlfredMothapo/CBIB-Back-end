'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const mysql = require('mysql');

class DBcon {
  constructor() {
    this.con = mysql.createConnection({
      host: 'localhost',
      user: 'root', //change to your username
      password: '', //your password
      database: 'cb' //your database name
    });
  }
  getConnection() {
    //connects to mysql and returns the connection
    this.con.connect(err => {
      if (err) throw err;
      console.log('Database connected!');
    });
    return this.con;
  }
  close_connection() {
    //closes the connection
    this.con.end();
  }
}
exports.DBcon = DBcon;
//# sourceMappingURL=db_connection.js.map