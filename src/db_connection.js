var mysql = require('mysql');
export class DBcon{
  constructor(){
    this.con = mysql.createConnection({
        host: 'localhost',
        user: 'alfred',
        password: '123456',
        database: 'cb'
    });
  }
  getConnection(){
    this.con.connect(function(err){
      if(err) throw err;
      console.log("Database connected!")
    })
    return this.con;
  }
  close_connection(){
    this.con.end();
  }
}
