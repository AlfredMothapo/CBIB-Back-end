'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mysql = require('mysql');
class DBcon {
  constructor() {
    this.con = mysql.createConnection({
      host: 'localhost',
      user: 'alfred',
      password: '123456',
      database: 'cb'
    });
  }
  getConnection() {
    this.con.connect(function (err) {
      if (err) throw err;
      console.log("Database connected!");
    });
    return this.con;
  }
  close_connection() {
    this.con.end();
  }
}
exports.DBcon = DBcon;
//# sourceMappingURL=db_connection.js.map