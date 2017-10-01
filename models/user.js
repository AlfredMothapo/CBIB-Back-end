import { DBcon } from '../db_connection';

const con = new DBcon();
const connection = con.getConnection();

export class UserModel {
  constructor(fName, lName, email, accesID, verToken) {
    this.first_name = fName;
    this.last_name = lName;
    this.email = email;
    this.accesID = accesID;
    this.password = '';
    this.verification_token = verToken;
  }
  //method to get access ID of a certain user
  static getUsers() {
    const queryString = 'SELECT email, user_id ' +
    ',CONCAT(first_name, " ", last_name) AS author ' +
     'from users where access_id > 0';
    return new Promise((resolve, reject) => {
      connection.query(queryString, (err, fields) => {
          if (err) return reject(err);
          resolve(fields);
      });
    });
  }
  static getAuthors() {
    const queryString = 'select user_id,email,' +
    'CONCAT(first_name, " ", last_name) AS author ' +
    'from users';
    return new Promise((resolve, reject) => {
      connection.query(queryString, (err, fields) => {
          if (err) return reject(err);
          resolve(fields);
      });
    });
  }

  static accountDetails(userId) {
    const sqlQuery = 'SELECT first_name, last_name, email, access_name, node_name ' +
    'FROM users JOIN access_levels ON access_levels.access_id = users.access_id ' +
    'JOIN membership ON membership.user_id = users.user_id JOIN nodes ON nodes.node_id ' +
    '= membership.node_id WHERE users.user_id = ? GROUP BY users.user_id';
    return new Promise((resolve, reject) => {
      connection.query(sqlQuery, [userId], (err, fields) => {
          if (err) return reject(err);
          resolve(fields);
      });
    });
  }

  static editAccount(userId, firstName, lastName, email) {
    const sqlQuery1 = 'UPDATE users SET first_name = ?, last_name = ?, email = ? WHERE user_id = ?';

    return new Promise((resolve, reject) => {
      connection.query(sqlQuery1, [firstName, lastName, email, userId], (err) => {
          if (err) {
            if (err) return reject(err);
          }
          // To display the updated details of the account
          resolve(this.accountDetails(userId));
      });
    });
  }
}
