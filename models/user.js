import { DBcon } from '../db_connection';

const con = new DBcon();
const connection = con.getConnection();
//for password encryption
const bcrypt = require('bcrypt');

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
    const queryString = 'SELECT email, users.user_id ' +
    ',first_name, last_name,node_id, access_id ' +
     'from users' +
     ' INNER JOIN membership on membership.user_id = users.user_id';
    return new Promise((resolve, reject) => {
      connection.query(queryString, (err, fields) => {
          if (err) return reject(err);
          resolve(fields);
      });
    });
  }

  static getUserById(userId) {
    const sqlQuery = 'SELECT email, users.user_id, first_name, ' +
    'last_name, access_id, node_id from users JOIN membership on ' +
    'membership.user_id = users.user_id where users.user_id = ?';

    return new Promise((resolve, reject) => {
    connection.query(sqlQuery, [userId], (err, fields) => {
        if (err) return reject(err);
        resolve(fields[0]);
    });
  });
 }

  static getAuthors() {
    const queryString = 'select user_id,email,' +
      'first_name, last_name ' +
    'from users';
    return new Promise((resolve, reject) => {
      connection.query(queryString, (err, fields) => {
          if (err) return reject(err);
          resolve(fields);
      });
    });
  }

  static accountDetails(userId) {
    const sqlQuery = 'SELECT first_name, last_name, email, access_id, node_id ' +
    'FROM users JOIN membership ON membership.user_id = users.user_id WHERE ' +
    'users.user_id = ? GROUP BY users.user_id';

    return new Promise((resolve, reject) => {
      connection.query(sqlQuery, [userId], (err, fields) => {
          if (err) return reject(err);
          resolve(fields);
      });
    });
  }

  static accountConfirmation(verificationToken, resp) {
    const sqlQuery1 = 'SELECT user_id, first_name, last_name FROM users ' +
    'WHERE verification_token = ?';
    const sqlQuery2 = 'UPDATE users SET verified_status = 1 ' +
    'WHERE verification_token = ?';

    return new Promise((resolve, reject) => {
      //Checks if the given verificationToken exists within the database
      connection.query(sqlQuery1, [verificationToken], (err, fields) => {
        if (err) {
          return reject(err);
        }
        //If nothing was found on the database, insert
        if (!fields.length) {
          resp.end('no user with given link');
        } else {
          //If something was found on the db, give error message
            connection.query(sqlQuery2, [verificationToken], (err1) => {
              if (err1) {
                return reject(err1);
              }
              resolve(fields);
            });
        }
      });
    });
  }

  static setPassword(userId, password, resp) {
    const saltRounds = 11;
    const sqlQuery = 'UPDATE users SET password = ? WHERE user_id = ?';
    return new Promise((resolve, reject) => {
      //password encryption
      const hash = bcrypt.hashSync(password, saltRounds);
      connection.query(sqlQuery, [hash, userId], (err3) => {
        if (err3) {
          return reject(err3);
        }
        resp.end('sucess');
        resolve();
        });
    });
  }
}
