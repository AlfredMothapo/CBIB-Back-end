var mysql = require('mysql');
export class DBcon{
  constructor(){
    this.con = mysql.createConnection({
        host: 'localhost',
        user: 'ntuthuko', //change to your username
        password: '68884856',   //your password
        database: 'cbib'  //your database name
    });
  }
  getConnection(){  //connects to mysql and returns the connection
    this.con.connect(function(err){
      if(err) throw err;
      console.log("Database connected!")
    })
    return this.con;
  }
  close_connection(){  //closes the connection
    this.con.end();
    console.log("holla");
  }
}
