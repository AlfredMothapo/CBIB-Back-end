import { UserModel } from './user';

export class GlobalAdmin extends UserModel {
  constructor(fName, lName, email, accesID, pass, verToken) {
    super(fName, lName, email, accesID, pass, verToken);
    this.role = 1;
  }
  createNode() {

  }
  static createMember(req) {

    /*const sqlQuery1 = 'SELECT * FROM users WHERE users.email = ?';
    return new Promise((resolve, reject) => {
      connection.query(sqlQuery1, [req.params.email], (err, fields) => {
        if (err) {
          return reject(err);
        }
        //If something was found on the database, insert
        if (!fields.length) {
          let verification_token = "fdfsdfgsdgdfdfh";
          //Insert into the users table
          sqlQuery2 = 'INSERT INTO users(first_name, last_name, email, date_registered,' +
          'verification_token, verified_status, access_id) VALUES (?, ?, ?, GETDATE(), ?, 0, ?)';
          //now insert into the membership table
          sqlQuery3 = 'INSERT INTO membership(node_id, user_id) VALUES ((SEELECT user_id FROM users WHERE email = ?), ?)';

          connection.query(queryString2, [req.params.first_name, req.params.last_name,req.params.email,
            verification_token, req.access_id], (err) => {
              if (err) {
                throw (err);
              }
          });
          connection.query(queryString3, [req.params.email, req.params.node_id], (err) => {
              if (err) {
                throw (err);
              }
          });
        }
        //If nothing was found on the db, give error message
        else {
          return res.send("A user with the email address already exists");
        }
      });
    });*/
  }

  static createAdmin() {

  }
}
