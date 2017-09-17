import { GlobalAdminModel } from '../models/global_admin';

const stringify = require('json-stringify-safe');

export class GlobalAdminController {

  static createMember(req, resp) {

    GlobalAdminModel.createMember(req.body.first_name, req.last_name, req.body.email, req.body.access_id).then(() => {
       resp.end(stringify('Success', null, 1)); //returns the research output as json
    });
  }
}
