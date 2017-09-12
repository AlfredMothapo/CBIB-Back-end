import { DBcon } from '../db_connection';

const con = new DBcon();
const connection = con.getConnection();

export class UserModel {
  constructor(fName, lName, email, accesID, pass, verToken) {
    this.first_name = fName;
    this.last_name = lName;
    this.email = email;
    this.accesID = accesID;
    this.password = pass;
    this.verification_token = verToken;
  }
  //method to get access ID of a certain user
  static getUsers() {
    const queryString = 'select user_id,email from users';
    return new Promise((resolve, reject) => {
      connection.query(queryString, (err, fields) => {
          if (err) return reject(err);
          resolve(fields);
      });
    });
  }
}
