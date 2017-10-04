import { DBcon } from '../db_connection';
import { UserModel } from './user';
import { emailSender } from './emailSender';


const dbCon = new DBcon();
const connection = dbCon.getConnection();
const uuidv1 = require('uuid/v1');

export class GlobalAdminModel extends UserModel {
  constructor(fName, lName, email, accesID, pass, verToken) {
    super(fName, lName, email, accesID, pass, verToken);
    this.role = 1;
  }

  createNode() {

  }
  static createAccount(firstName, lastName, email, accessId, nodeId, res) {
    const sqlQuery1 = 'SELECT * FROM users WHERE users.email = ?';
    return new Promise((resolve, reject) => {
      //Checks if the given email exists within the database
      connection.query(sqlQuery1, [email], (err, fields) => {
        if (err) { //handle error
          return reject(err);
        }
        //If nothing was found on the database, insert
        if (!fields.length) {
          //generate a random token for a user
          const verificationToken = uuidv1();
          //For adding into the users table
          const password = 'initialpassword';
          const sqlQuery2 = 'INSERT INTO users(first_name, last_name, email, password,' +
          'verification_token, verified_status, access_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
          //now insert into the membership table
          const sqlQuery3 = 'INSERT INTO membership(user_id, node_id) VALUES ((SELECT' +
          ' user_id FROM users WHERE email = ?), ?)';

          connection.query(sqlQuery2, [firstName, lastName, email, password,
            verificationToken, 0, accessId], (err2) => {
              if (err2) {
                return reject(err2);
              }

              connection.query(sqlQuery3, [email, nodeId], (err3) => {
                  if (err3) {
                    return reject(err3);
                  }
                  res.end('success');
              });
            });
            //  emailSender.createEmail(email, verificationToken, firstName);
       //}
     } else { //If something was found on the db, give error message
          return res.end('A user with the email address already exists');
        }
      });
    });
  }

  static editAccount(userId, nodeId, accessId) {
    const sqlQuery1 = 'UPDATE users SET access_id = ? WHERE user_id = ?';
    const sqlQuery2 = 'UPDATE membership SET node_id = ? WHERE user_id = ?';
    return new Promise((resolve, reject) => {
      connection.query(sqlQuery1, [accessId, userId], (err) => {
          if (err) {
            if (err) return reject(err);
          }
      });
      connection.query(sqlQuery2, [nodeId, userId], (err) => {
          if (err) {
            if (err) return reject(err);
          }
          // To display the updated details of the account
          resolve(UserModel.accountDetails(userId));
      });
    });
  }

  static deleteAccount(userId, res) {
    const sqlQuery1 = 'UPDATE users SET access_id = ? WHERE user_id = ?';
    const sqlQuery2 = 'DELETE FROM membership WHERE user_id = ?';
    return new Promise((resolve, reject) => {
      connection.query(sqlQuery1, [0, userId], (err) => {
          if (err) {
            if (err) return reject(err);
          }
      });
      connection.query(sqlQuery2, [userId], (err) => {
          if (err) {
            if (err) return reject(err);
          }
          // To display the updated details of the account
          res.end('success');
      });
    });
  }
}
