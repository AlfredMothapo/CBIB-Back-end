import { UserModel } from '../models/user';

const stringify = require('json-stringify-safe');

export class UserController {
  static getUsers(req, resp) {
    UserModel.getUsers().then((fields) => {
       resp.end(stringify(fields, null, 1)); //returns the research output as json
     });
  }
  static getAuthors(req, resp) {
    UserModel.getAuthors().then((fields) => {
       resp.end(stringify(fields, null, 1)); //returns the research output as json
     });
  }

  static accountDetails(req, resp) {
    UserModel.accountDetails(req.params.id).then((fields) => {
       resp.end(stringify(fields, null, 1)); //returns the research output as json
     });
  }

  static editAccount(req, resp) {
    UserModel.editAccount(req.body.user_id, req.body.first_name,
      req.body.last_name, req.body.email).then((fields) => {
       resp.end(stringify(fields, null, 1)); //returns the research output as json
     });
  }
}
