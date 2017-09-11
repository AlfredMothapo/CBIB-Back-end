import { ResearchOutputModel } from '../models/research_output';

const stringify = require('json-stringify-safe');

export class ResearchOutputController {
  //function to get all research outputs
  static getBasic(req, resp) {
    ResearchOutputModel.getBasic().then((fields) => {
      //operations based on DB fields can be done here
        const response = {};
        response.outputs = fields;
        resp.end(stringify(response, null, 1));
    });
  }
//saves a research output
  static saveResearchOutput(req, resp) {
    //creates a new research output.
    const researcOutput = new ResearchOutputModel(req.body.title, req.body.publication_year,
     req.body.additional_info, req.body.text, req.body.type);
     researcOutput.save(); //saves the research output
     resp.end('success');
  }
  //returns a research output given an id
  static getBasicById(req, resp) {
   ResearchOutputModel.getBasicById(req).then((fields) => {
      resp.end(stringify(fields, null, 1)); //returns the research output as json
    });
  }
}
