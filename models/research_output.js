import { DBcon } from '../db_connection';

const dbCon = new DBcon();
const connection = dbCon.getConnection();

export class ResearchOutputModel {
    constructor(title, pubYear, addInfo, text, type, author, coauthors,
    prooflink, proofver) {
        this.title = title;
        this.text = text;
        this.publication_year = pubYear;
        this.additional_info = addInfo;
        this.type = type; //Hardcoded here need to be int from Drop down values in front-end
        this.db_con = new DBcon();
        this.proof_verified = proofver;
        this.proof_link = prooflink;
        this.author = author;
        this.pdf_link = 'Hello world';
        this.coauthors = coauthors;
        this.connection = this.db_con.getConnection(); //db connection
    }
    //get basic research outputs.
    static getBasic() {
      const sql = 'SELECT  ' +
      '`research_outputs`.`ro_id` AS `id`, `research_outputs`.`title`, ' +
      '`research_types`.`type`, `research_outputs`.`publication_year`, ' +
      '`research_outputs`.`abstract` AS `additional_info`, ' +
      'GROUP_CONCAT(CONCAT(`users`.`first_name`, " ", `users`.`last_name`) ' +
      ' SEPARATOR ", ") `Authors` FROM `research_outputs` INNER JOIN' +
      '`research_types` ON `research_outputs`.`ro_type` = ' +
      '`research_types`.`type_id` INNER JOIN `authors` ON `authors`.`ro_id` = ' +
      '`research_outputs`.`ro_id` INNER JOIN `users` ON `users`.`user_id` = ' +
      '`authors`.`author_id` ' +
      'GROUP BY `research_outputs`.`ro_id`';
      return new Promise((resolve, reject) => {
        connection.query(sql, (err, fields) => {
            if (err) return reject(err);
            resolve(fields);
        });
      });
    }
    //get basic researh outputs by id.
    static getBasicById(roId) {
      const queryString = 'SELECT  ' +
      '`research_outputs`.`ro_id` AS `id`, `research_outputs`.`pdf_link`, ' +
      '`research_outputs`.`title`, `research_outputs`.`publication_year`, ' +
      '`research_outputs`.`abstract` AS `additional_info`, ' +
      '`research_types`.`type` AS `type`, ' +
      'GROUP_CONCAT(CONCAT(`users`.`first_name`, " ", ' +
      '`users`.`last_name`) SEPARATOR ", ") `Authors` FROM ' +
      '`research_outputs` INNER JOIN `research_types` ON ' +
      '`research_outputs`.`ro_type` = `research_types`.`type_id` INNER JOIN' +
      '`authors` ON `authors`.`ro_id` = `research_outputs`.`ro_id` INNER JOIN ' +
      '`users` ON `users`.`user_id` = `authors`.`author_id` WHERE ' +
      '`research_outputs`.`ro_id` = ? GROUP BY' +
      '`research_outputs`.`ro_id`';

      return new Promise((resolve, reject) => {
        connection.query(queryString, [roId], (err, fields) => {
            if (err) {
              return reject(err);
            }
            resolve(fields);
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
      return new Promise(() => {
        this.connection.query(sql, [this.title, this.text, this.publication_year, this.type,
        this.additional_info,
        this.proof_link, this.proof_verified, this.pdf_link],
          (error) => {
          if (error) {
            throw error;
          }
        });
        this.connection.query(sql2, [this.author, this.title], (error) => {
          if (error) {
            throw error;
          }
        });
        for (let i = 0; i < this.coauthors.length; i++) {
          this.connection.query(sql2, [this.coauthors[i], this.title], (error) => {
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
    const queryString = 'SELECT  ' +
    '`research_outputs`.`ro_id` AS `id`, `research_outputs`.`title`, ' +
    '`research_outputs`.`ro_type`, `research_outputs`.`publication_year`, ' +
    '`research_outputs`.`abstract` AS `additional_info`, `research_outputs`.`pdf_link`, ' +
    '`research_outputs`.`proof_verified`, `research_outputs`.`proof_link`, ' +
    'GROUP_CONCAT(CONCAT(`users`.`first_name`, " ", `users`.`last_name`) ' +
    ' SEPARATOR ", ") `Authors` FROM `research_outputs` INNER JOIN' +
    '`research_types` ON `research_outputs`.`ro_type` = ' +
    '`research_types`.`type_id` INNER JOIN `authors` ON `authors`.`ro_id` = ' +
    '`research_outputs`.`ro_id` INNER JOIN `users` ON `users`.`user_id` = ' +
    '`authors`.`author_id` WHERE `research_outputs`.`ro_id` = ? ' +
    'GROUP BY `research_outputs`.`ro_id`';

    return new Promise((resolve, reject) => {
      connection.query(queryString, [roId], (err, fields) => {
          if (err) {
            return reject(err);
          }
          resolve(fields);
      });
    });
  }
  // returns detailed information of a research with given id
  static getDetailed() {
    const queryString = 'SELECT  ' +
    '`research_outputs`.`ro_id` AS `id`, `research_outputs`.`title`, ' +
    '`research_outputs`.`ro_type`, `research_outputs`.`publication_year`, ' +
    '`research_outputs`.`abstract` AS `additional_info`, `research_outputs`.`pdf_link`, ' +
    '`research_outputs`.`proof_verified`, `research_outputs`.`proof_link`, ' +
    'GROUP_CONCAT(CONCAT(`users`.`first_name`, " ", `users`.`last_name`) ' +
    ' SEPARATOR ", ") `Authors` FROM `research_outputs` INNER JOIN' +
    '`research_types` ON `research_outputs`.`ro_type` = ' +
    '`research_types`.`type_id` INNER JOIN `authors` ON `authors`.`ro_id` = ' +
    '`research_outputs`.`ro_id` INNER JOIN `users` ON `users`.`user_id` = ' +
    '`authors`.`author_id`';

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
  static editResearchOutput(roId, title, typeId, publicationYear,
    abstract, pdfLink, proofVerified, proofLink) {
    const queryString = 'UPDATE research_outputs SET title = ?, type_id = ?, ' +
    'publication_year = ?, abstract = ?, pdf_link = ?, proof_verified =?, ' +
    'proof_link = ? WHERE ro_id = ?';
    return new Promise((resolve, reject) => {
      connection.query(queryString, [title, typeId, publicationYear, abstract, pdfLink,
        proofVerified, proofLink, roId], (err) => {
          if (err) {
            return reject(err);
          }
          resolve(this.getDetailedInformation(roId));
      });
    });
  }

  static addAuthor(authorId, roId) {
    const queryString1 = 'INSERT INTO authors(author_id, ro_id) VALUES(?,?)';
    return new Promise((resolve, reject) => {
      connection.query(queryString1, [authorId, roId], (err) => {
          if (err) {
            return reject(err);
          }
          // call the other method to display the up to date info
          resolve(this.getDetailedInformation(roId));
      });
    });
  }

  static removeAuthor(authorId, roId) {
    const queryString1 = 'DELETE FROM authors WHERE author_id = ? AND ro_id = ?';
    return new Promise((resolve, reject) => {
      connection.query(queryString1, [authorId, roId], (err) => {
          if (err) {
            return reject(err);
          }
      });
      // call the other method to display the up to date info
      resolve(this.getDetailedInformation(roId));
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
}
