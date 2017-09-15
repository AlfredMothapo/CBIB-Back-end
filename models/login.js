import { DBcon } from '../db_connection';

const con = new DBcon();
const connection = con.getConnection();

export class LoginModel {

  static getUser(username, password) {
    const sql = 'select first_name,email,users.user_id,access_id,node_id from users ' +
    'INNER JOIN membership ON users.user_id = membership.user_id ' +
    'WHERE users.email=? AND users.password=?  ';
    return new Promise((resolve, reject) => {
      connection.query(sql, [username, password], (err, fields) => {
          if (err) return reject(err);
          resolve(fields);
      });
    });
  }
}
