import { GlobalAdminModel } from '../models/global_admin';

const stringify = require('json-stringify-safe');

export class GlobalAdminController {
  static createAccount(req, res) {
    GlobalAdminModel.createAccount(req.body.first_name, req.body.last_name, req.body.email,
      req.body.access_id, req.body.node_id, res).then(() => {
    });
  }

  static editAccount(req, resp) {
    GlobalAdminModel.editAccount(req.body.user_id, req.body.node_id,
     req.body.access_id).then((fields) => {
       resp.end(stringify(fields, null, 1)); //returns the research output as json
     });
  }

  static deleteAccount(req, res) {
    GlobalAdminModel.deleteAccount(req.params.id, res).then(() => {
    });
  }
}
