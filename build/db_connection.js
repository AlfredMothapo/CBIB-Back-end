'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const mysql = require('mysql');

class DBcon {
  constructor() {
    this.con = mysql.createConnection({
      host: 'localhost',
      user: 'ntuthuko', //change to your username
      password: '68884856', //your password
      database: 'cbib' //your database name
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
  closeConnection() {
    //closes the connection
    this.con.end();
  }
}
exports.DBcon = DBcon;
//# sourceMappingURL=db_connection.js.map