import { RecyclingBinModel } from '../models/recycling_bin';

//const stringify = require('json-stringify-safe');

export class RecyclingBinController {
  static userRecyclingBin(req, resp) {
    RecyclingBinModel.userRecyclingBin(req.params.id, resp);
  }

  static nodeRecyclingBin(req, resp) {
    RecyclingBinModel.nodeRecyclingBin(req.params.id, resp);
  }

  static deletePermanently(req, resp) {
    RecyclingBinModel.deletePermanently(req.params.id, resp);
  }

  static retrieveResearch(req, resp) {
    RecyclingBinModel.retrieveResearch(req.params.id, resp);
  }
}
