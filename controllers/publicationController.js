import { PublicationModel } from '../models/publications';

const stringify = require('json-stringify-safe');

export class PublicationController {
  // const session = require('express-session
  static getPublications(req, resp) {
    PublicationModel.getPublications().then((fields) => {
      resp.end(stringify(fields, null, 1));
    });
  }
}
