const mysql = require('mysql');

export class DBcon{
  constructor(){
    this.con = mysql.createConnection({
        host: 'localhost',
        user: 'root', //change to your username
        password: '',   //your password
        database: 'cb'  //your database name
    });
  }
  getConnection(){  //connects to mysql and returns the connection
    this.con.connect( (err) => {
      if (err) throw err;
      console.log('Database connected!')
    })
    return this.con;
  }
  close_connection(){  //closes the connection
    this.con.end();
  }
}
