import { DBcon } from '../db_connection';

const dbCon = new DBcon();
const connection = dbCon.getConnection();

export class ResearchOutputModel {
    constructor(title, pubYear, addInfo, text, type, author, coauthors,
    prooflink, proofver, pdf) {
        this.title = title;
        this.text = text;
        this.publication_year = pubYear;
        this.additional_info = addInfo;
        this.type = type; //Hardcoded here need to be int from Drop down values in front-end
        this.db_con = new DBcon();
        this.proof_verified = proofver;
        this.proof_link = prooflink;
        this.author = author;
        this.pdf_link = pdf;
        this.coauthors = coauthors;
        this.connection = this.db_con.getConnection(); //db connection
    }
    //get basic research outputs.
    static getBasic() {
      const sql = 'SELECT research_outputs.ro_id AS id, ' +
      'title, ro_type as type, publication_year, users.user_id AS ' +
      'author, GROUP_CONCAT(CONCAT(users.user_id) SEPARATOR ", ") ' +
      'coauthors, abstract AS additional_info, ' +
      'pdf_link, text FROM research_outputs INNER JOIN ' +
      'research_types ON research_outputs.ro_type = ' +
      'research_types.type_id INNER JOIN authors ON authors.ro_id = ' +
      'research_outputs.ro_id INNER JOIN users ON users.user_id = ' +
      'authors.author_id GROUP BY research_outputs.ro_id ';

      return new Promise((resolve, reject) => {
        connection.query(sql, (err, fields) => {
            if (err) return reject(err);
            resolve(fields);
        });
      });
    }
    //get basic researh outputs by id.
    static getBasicById(roId) {
      const queryString = 'SELECT research_outputs.ro_id AS id, ' +
      'title, ro_type as type, publication_year, users.user_id AS ' +
      'author, GROUP_CONCAT(CONCAT(users.user_id) SEPARATOR ", ") ' +
      'coauthors, abstract AS additional_info, ' +
      'pdf_link, text FROM research_outputs INNER JOIN ' +
      'research_types ON research_outputs.ro_type = ' +
      'research_types.type_id INNER JOIN authors ON authors.ro_id = ' +
      'research_outputs.ro_id INNER JOIN users ON users.user_id = ' +
      'authors.author_id WHERE research_outputs.ro_id = ? ' +
      'GROUP BY research_outputs.ro_id';

      return new Promise((resolve, reject) => {
        connection.query(queryString, [roId], (err, fields) => {
            if (err) {
              return reject(err);
            }
            resolve(fields[0]);
        });
    });
  }

  getProofVerified() {
    return this.proof_verified;
  }
  getProofLink() {
    return this.proof_link;
  }
  save() { //this function saves details of a research output.
      const sql = 'INSERT INTO research_outputs(title, text, publication_year, ' +
      'ro_type, abstract, proof_link, proof_verified, pdf_link) VALUES (?,?, ?,?, ?, ?, ?, ?)';
      const sql2 = 'Insert INTO authors (author_id,ro_id) VALUES' +
      '(?,(SELECT ro_id FROM research_outputs WHERE title=?))';
      return new Promise((resolve, reject) => {
        
        // NOTE: this code require transaction to keep data integrity
        // in the case of one of the inserts failing
        
        // insert research_outputs
        this.connection.query(sql, [this.title, this.text, this.publication_year, this.type,
        this.additional_info,
        this.proof_link, this.proof_verified, this.pdf_link],
          (error) => {
          if (error) {
            return reject(error);
          }
          // insert authors
          this.connection.query(sql2, [this.author, this.title], (error) => {
            if (error) {
              return reject(error);
            }
            // insert coauthors
            for (let i = 0; i < this.coauthors.length; i++) {
              this.connection.query(sql2, [this.coauthors[i], this.title], (error) => {
                if (error) {
                  return reject(error);
                }
              });
            }
            // done
            resolve();
          });
        });
      });
  }

  static editResearchOutput(roId, title, typeId, publicationYear, abstract, pdfLink,
    proofVerified, proofLink, text, author, coauthors) {
    /*roId, title, typeId, publicationYear,
    abstract, pdfLink, proofVerified, proofLink, , coauthors, text) {*/
    const queryString1 = 'UPDATE research_outputs SET title = ?, publication_year = ?, ' +
    'ro_type = ?, abstract = ?, pdf_link = ?, proof_verified =?, proof_link = ?, text = ? ' +
    'WHERE ro_id = ?';

    const queryString2 = 'Insert INTO authors (author_id, ro_id) VALUES(?,?)';

    return new Promise((resolve, reject) => {
      // Update the research
      connection.query(queryString1, [title, publicationYear, typeId, abstract, pdfLink,
         proofVerified, proofLink, text, roId], (err) => {
          /*, typeId, abstract, proofLink,
            proofVerified, pdfLink, textyy*/
          if (err) {
            return reject(err);
          }
          resolve('success');
      });
      // Add the author
      connection.query(queryString2, [author, roId], (error) => {
        if (error) {
          throw error;
        }
      });
      // Add the coauthors
      for (let i = 0; i < coauthors.length; i++) {
        connection.query(queryString2, [coauthors[i], roId], (error) => {
          if (error) {
            throw error;
          }
        });
      }
    });
  }

  static deleteById(roId) {
    /* This method moves the data from the rese table to recycling_bin table*/
    const queryString1 = 'INSERT INTO recycling_bin SELECT * FROM research_outputs WHERE ' +
    'research_outputs.ro_id = ?';
    const queryString2 = 'DELETE FROM research_outputs WHERE research_outputs.ro_id = ?';

    return new Promise(() => {
      // Copying the data from the research outputs table to the recycling_bin table
      connection.query(queryString1, [roId, roId], (err) => {
          if (err) {
            throw (err);
          }
      });
      //Deleting data from the research_outputs table
      connection.query(queryString2, [roId], (err) => {
          if (err) {
            throw (err);
          }
      });
   });
  }

  // returns detailed information of a research with given id
  static getDetailedInformation(roId) {
    const queryString = 'SELECT research_outputs.ro_id AS id, ' +
    'title, ro_type as type, publication_year, users.user_id AS ' +
    'author, GROUP_CONCAT(CONCAT(users.user_id) SEPARATOR ", ") ' +
    'coauthors, abstract AS additional_info, proof_link, ' +
    'proof_verified, pdf_link, text FROM research_outputs INNER JOIN ' +
    'research_types ON research_outputs.ro_type = ' +
    'research_types.type_id INNER JOIN authors ON authors.ro_id = ' +
    'research_outputs.ro_id INNER JOIN users ON users.user_id = ' +
    'authors.author_id WHERE research_outputs.ro_id = ? ' +
    'GROUP BY research_outputs.ro_id';

    return new Promise((resolve, reject) => {
      connection.query(queryString, [roId], (err, fields) => {
          if (err) {
            return reject(err);
          }
          resolve(fields[0]);
      });
    });
  }
  // returns detailed information of a research with given id
  static getDetailed() {
    const queryString = 'SELECT research_outputs.ro_id AS id, ' +
    'title, ro_type as type, publication_year, users.user_id AS ' +
    'author, GROUP_CONCAT(CONCAT(users.user_id) SEPARATOR ", ") ' +
    'coauthors, abstract AS additional_info, proof_link, ' +
    'proof_verified, pdf_link, text FROM research_outputs INNER JOIN ' +
    'research_types ON research_outputs.ro_type = ' +
    'research_types.type_id INNER JOIN authors ON authors.ro_id = ' +
    'research_outputs.ro_id INNER JOIN users ON users.user_id = ' +
    'authors.author_id GROUP BY research_outputs.ro_id ';

    return new Promise((resolve, reject) => {
      connection.query(queryString, (err, fields) => {
          if (err) {
            return reject(err);
          }
          resolve(fields);
      });
    });
  }
  // To edit a research_outputs


  static addAuthor(authorId, roId) {
    const queryString1 = 'INSERT INTO authors(author_id, ro_id) VALUES(?,?)';
    return new Promise((reject) => {
      connection.query(queryString1, [authorId, roId], (err) => {
          if (err) {
            return reject(err);
          }
      });
    });
  }

  static removeAuthors(roId) {
    const queryString1 = 'DELETE FROM authors WHERE ro_id = ?';
    return new Promise((resolve, reject) => {
      connection.query(queryString1, [roId], (err) => {
          if (err) {
            return reject(err);
          }
      });
    });
  }

  static getPublicationTypes() {
    const queryString = 'SELECT * FROM research_types';
    return new Promise((resolve, reject) => {
      connection.query(queryString, (err, fields) => {
          if (err) {
            return reject(err);
          }
          resolve(fields);
      });
    });
  }


  // returns search data
  static search(input) {
    const queryString = 'SELECT  ' +
    '`research_outputs`.`ro_id` AS `id`, `research_outputs`.`title`, ' +
    '`research_outputs`.`ro_type`, `research_outputs`.`publication_year`, ' +
    '`research_outputs`.`abstract` AS `additional_info`, `research_outputs`.`pdf_link`, ' +
    '`research_outputs`.`proof_verified`, `research_outputs`.`proof_link`, ' +
    'GROUP_CONCAT(CONCAT(`users`.`first_name`, " ", `users`.`last_name`) ' +
    ' SEPARATOR ", ") `Authors` FROM `research_outputs` INNER JOIN ' +
    '`research_types` ON `research_outputs`.`ro_type` = ' +
    '`research_types`.`type_id` INNER JOIN `authors` ON `authors`.`ro_id` = ' +
    '`research_outputs`.`ro_id` INNER JOIN `users` ON `users`.`user_id` = ' +
    '`authors`.`author_id` WHERE `research_outputs`.`abstract` LIKE ? ' +
    'OR `Authors` LIKE ? ' +
    'OR `research_outputs`.`title` LIKE ? ' +
    'GROUP BY `research_outputs`.`ro_id`';

    return new Promise((resolve, reject) => {
      connection.query(queryString, [input, input, input], (err, fields) => {
          if (err) {
            return reject(err);
          }
          resolve(fields);
      });
    });
  }
}
