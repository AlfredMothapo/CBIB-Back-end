import { GlobalAdminModel } from '../models/global_admin';

const stringify = require('json-stringify-safe');

export class GlobalAdminController {

  static createMember(req, resp) {
   //GlobalAdminModel.createMember(req.body.node_name, req.body.description).then(() => {
      resp.end(stringify('Success', null, 1)); //returns the research output as json
    });
  }
}
