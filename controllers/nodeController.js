import { NodeModel } from '../models/n_ode';

const stringify = require('json-stringify-safe');

export class NodeController {
  static saveNode(req, resp) {
    NodeModel.createNode(req.body.name, req.body.description, req.body.nodeAdmin,
      req.body.location)
      .then(() => resp.end('success'));
  }

  static getNodes(req, resp) {
    NodeModel.getNodes().then((fields) => {
       resp.end(stringify(fields, null, 1)); //returns the research output as json
     });
  }
  static getNodeById(req, resp) {
    NodeModel.getNodeById(req.params.id).then((fields) => {
       resp.end(stringify(fields, null, 1)); //returns the research output as json
     });
  }
}
