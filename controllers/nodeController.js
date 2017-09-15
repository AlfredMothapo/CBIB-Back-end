import { NodeModel } from '../models/n_ode';

const stringify = require('json-stringify-safe');

export class NodeController {

  static saveNode(req, resp) {
    NodeModel.createNode(req.body.node_name, req.body.description).then((fields) => {
       resp.end(stringify('Success', null, 1)); //returns the research output as json
     });
  }
}
