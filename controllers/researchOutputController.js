import { ResearchOutputModel } from '../models/research_output';

const stringify = require('json-stringify-safe');

export class ResearchOutputController {
  //function to get all research outputs
  static getBasic(req, resp) {
    ResearchOutputModel.getBasic().then((fields) => {
      //operations based on DB fields can be done here
        resp.end(stringify(fields, null, 1));
    });
  }
//saves a research output
  static saveResearchOutput(req, resp) {
    //creates a new research output.
    const researchOutput = new ResearchOutputModel(req.body.title, req.body.publication_year,
      req.body.additional_info, req.body.text, req.body.type, req.body.author,
      req.body.coauthors, req.body.proof_link, req.body.proof_verified);
    researchOutput.save()  //saves the research output
       .then(() => resp.end('success'));
  }
  // edit an existing research
  static editResearchOutput(req, resp) {
    ResearchOutputModel.removeAuthors(req.body.id);
    ResearchOutputModel.editResearchOutput(req.body.id, req.body.title,
       req.body.type, req.body.publication_year, req.body.additional_info, req.body.pdf_link,
       req.body.proof_verified, req.body.proof_link, req.body.text,
       req.body.author, req.body.coauthors).then((fields) => {
         resp.end(stringify(fields, null, 1)); //returns the research output as json
     });
  }
  //returns a research output given an id
  static getBasicById(req, resp) {
   ResearchOutputModel.getBasicById(req.params.id).then((fields) => {
      resp.end(stringify(fields, null, 1)); //returns the research output as json
    });
  }

  static deleteById(req, resp) {
    ResearchOutputModel.deleteById(req.params.id);
    resp.end('success');
  }

  static getDetailedInformation(req, resp) {
   ResearchOutputModel.getDetailedInformation(req.params.id).then((fields) => {
      resp.end(stringify(fields, null, 1)); //returns the research output as json
    });
  }
  static getDetailed(req, resp) {
   ResearchOutputModel.getDetailed().then((fields) => {
      resp.end(stringify(fields, null, 1)); //returns the research output as json
    });
  }

  static addAuthor(req, resp) {
    ResearchOutputModel.addAuthor(req.body.author_id, req.body.ro_id);
    ResearchOutputModel.getDetailedInformation(req.body.ro_id).then((fields) => {
      resp.end(stringify(fields, null, 1)); //returns the research output as json
    });
  }

  static getPublicationTypes(req, resp) {
    ResearchOutputModel.getPublicationTypes().then((fields) => {
        resp.end(stringify(fields, null, 1)); //returns the research output as json
    });
  }
}
