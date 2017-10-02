import { DBcon } from '../db_connection';

const bcrypt = require('bcrypt');

const con = new DBcon();
const connection = con.getConnection();

export class LoginModel {

  static getUser(username, password) {
    const sql2 = 'SELECT password FROM users WHERE email = ?';
    console.log(username);
    connection.query(sql2, ['mas.alfred@yahoo.com'], (err, fields) => {
          const pwd = fields[0].password;
          if (err) {
                throw err;
              } else if (bcrypt.compareSync(password.toString(), pwd.toString())) {
                //log them in
                const sql = 'select first_name,email,users.user_id,access_id,node_id' +
                ' from users ' +
                'INNER JOIN membership ON users.user_id = membership.user_id ' +
                'WHERE users.email=? AND users.password=?  ';
                return new Promise((resolve, reject) => {
                  connection.query(sql, [username, pwd], (error, fieldsa) => {
                      if (error) return reject(error);
                      resolve(fieldsa);
                  });
                });
              }
        });
  }
}
