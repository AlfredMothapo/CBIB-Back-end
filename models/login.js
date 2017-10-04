import { DBcon } from '../db_connection';

const bcrypt = require('bcrypt');
const stringify = require('json-stringify-safe');

const con = new DBcon();
const connection = con.getConnection();

export class LoginModel {

  static getUser(username, password, resp) {
    const sql2 = 'SELECT password FROM users WHERE email = ?';
    connection.query(sql2, [username], (err, fields) => {
          try {
            const pwd = fields[0].password;
            if (err) {
                  throw err;
                } else if (bcrypt.compareSync(password.toString(), pwd.toString()) === true) {
                  //log them in
                  const sql = 'select first_name,last_name, email,users.user_id,access_id,node_id' +
                  ' from users ' +
                  'INNER JOIN membership ON users.user_id = membership.user_id ' +
                  'WHERE users.email=? AND users.password=?  ';
                  return new Promise((resolve, reject) => {
                    connection.query(sql, [username, pwd], (error, fieldsa) => {
                        if (error) return reject(error);
                        resolve(fieldsa);
                        resp.end(stringify(fieldsa[0], null, 1));
                    });
                  });
                } else {
                  resp.end('Wrong login details');
                }
          } catch (e) {
            resp.end('Wrong login details');
          }
        });
  }
}
