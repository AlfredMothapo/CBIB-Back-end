import { DBcon } from '../db_connection';
import { UserModel } from './user';

const dbCon = new DBcon();
const connection = dbCon.getConnection();

export class GlobalAdminModel extends UserModel {
  constructor(fName, lName, email, accesID, pass, verToken) {
    super(fName, lName, email, accesID, pass, verToken);
    this.role = 1;
  }

  createNode() {

  }
  static createMember(first_name, last_name, email, access_id, node_id, res) {
    const sqlQuery1 = 'SELECT * FROM users WHERE users.email = ?';
    return new Promise((resolve, reject) => {
      //Checks if the given email exists within the database
      connection.query(sqlQuery1, [email], (err, fields) => {
        if (err) { //handle error
          return reject(err);
        }
        //If something was found on the database, insert
        if (!fields.length) {
          //generate a random token for a user
          const uuidv1 = require('uuid/v1');
          const verification_token = uuidv1();

          const sqlQuery2 = 'INSERT INTO users(first_name, last_name, email,' +
          'verification_token, verified_status, access_id) VALUES (?, ?, ?, ?, ?, ?)';
          //now insert into the membership table
          const sqlQuery3 = 'INSERT INTO membership(node_id, user_id) VALUES ((SELECT user_id FROM users WHERE email = ?), ?)';

          connection.query(sqlQuery2, [first_name, last_name, email,
            verification_token, 0, access_id], (err) => {
              if (err) {
                throw (err);
                return reject(err);
              }
          });

          connection.query(sqlQuery3, [email, node_id], (err) => {
              if (err) {
                throw (err);
                return reject(eer);
              }
          });
          res.end("success")
        }
        //If nothing was found on the db, give error message
        else {
          return res.end("A user with the email address already exists");
        }
      });
    });
  }

  static createAdmin() {

  }
}
