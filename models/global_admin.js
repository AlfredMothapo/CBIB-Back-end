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
  static createMember(firstName, lastName, email, accessId, nodeId, res) {
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
          const sqlQuery2 = 'INSERT INTO users(first_name, last_name, email,' +
          'verification_token, verified_status, access_id) VALUES (?, ?, ?, ?, ?, ?)';
          //now insert into the membership table
          const sqlQuery3 = 'INSERT INTO membership(user_id, node_id) VALUES ((SELECT' +
          ' user_id FROM users WHERE email = ?), ?)';

          connection.query(sqlQuery2, [firstName, lastName, email,
            verificationToken, 0, accessId], (err2) => {
              if (err) {
                throw (err2);
              }
          });
          connection.query(sqlQuery3, [email, nodeId], (err3) => {
              if (err) {
                throw (err3);
              }
          });
          emailSender.createEmail(email, verificationToken, firstName);
          res.end('success');


       //}
     } else { //If something was found on the db, give error message
          return res.end('A user with the email address already exists');
        }
      });
    });
  }

  static createAdmin() {

  }
}
