import { LoginModel } from '../models/login';

const stringify = require('json-stringify-safe');

export class LoginController {
  // const session = require('express-session
  static loginUser(req, resp) {
    LoginModel.getUser(req.body.email, req.body.password).then(
      (fields) => {
          resp.end(stringify(fields, null, 1));
      });
  }
}
