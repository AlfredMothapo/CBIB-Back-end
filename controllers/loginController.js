import { LoginModel } from '../models/login';

export class LoginController {
  // const session = require('express-session
  static loginUser(req, resp) {
    LoginModel.getUser(req.body.email, req.body.password, resp);
  }
}
