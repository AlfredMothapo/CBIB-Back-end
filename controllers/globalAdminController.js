import { GlobalAdminModel } from '../models/global_admin';

export class GlobalAdminController {
  static createMember(req, res) {
    GlobalAdminModel.createMember(req.body.first_name, req.body.last_name, req.body.email,
      req.body.access_id, req.body.node_id, res).then(() => {
    });
  }
}
