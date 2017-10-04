const mysql = require('mysql');

export class DBcon {
  constructor() {
    this.con = mysql.createConnection({
        host: 'localhost',
        user: 'root', //change to your username
        password: '', //your password
        database: 'cbib'//your database name
    });
  }
  getConnection() { //connects to mysql and returns the connection
    this.con.connect((err) => {
      if (err) throw err;
      console.log('Database connected!');
    });
    return this.con;
  }
  closeConnection() { //closes the connection
    this.con.end();
  }
}
