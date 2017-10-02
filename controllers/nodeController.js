import { NodeModel } from '../models/n_ode';

export class NodeController {

  static saveNode(req, resp) {
    NodeModel.createNode(req.body.node_name, req.body.description, req.body.nodeAdmin,
      req.body.location);
      resp.end('success');
  }
}
