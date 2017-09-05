'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mysql = require('mysql');
class DBcon {
  constructor() {
    this.con = mysql.createConnection({
      host: 'localhost',
      user: 'alfred', //change to your username
      password: '123456', //your password
      database: 'cb' //your database name
    });
  }
  getConnection() {
    //connects to mysql and returns the connection
    this.con.connect(function (err) {
      if (err) throw err;
      console.log("Database connected!");
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