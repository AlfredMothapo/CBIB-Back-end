import { DBcon } from '../db_connection';
//
export class ResearchOutputModel {
    constructor(title, pubYear, addInfo, type, firstName, lastName) {
        this.title = title;
        this.publication_year = pubYear;
        this.additional_info = addInfo;
        this.type = type; //Hardcoded here need to be int from Drop down values in front-end
        this.db_con = new DBcon();
        this.proof_verified = 0;
        this.proof_link = 'www';
        this.first_name = firstName;
        this.last_name = lastName;
        this.connection = this.db_con.getConnection(); //db connection
    }
    //get basic research outputs.
    static getBasic() {
      const dbCon = new DBcon();
      const connection = dbCon.getConnection();
      const sql = 'select research_outputs.ro_id as id, title, type, publication_year, pdf_link,' +
      'abstract as additional_info, first_name as Author_First_Name ' +
      ', last_name as Author_Last_Name from users INNER JOIN authors ON ' +
      'users.user_id = authors.author_id INNER JOIN research_outputs ON ' +
      ' research_outputs.ro_id=authors.ro_id ' +
          'INNER JOIN research_types ON  research_outputs.ro_type  = research_types.type_id';
      return new Promise((resolve, reject) => {
        connection.query(sql, (err, fields) => {
            if (err) return reject(err);
            resolve(fields);  //return the fields/results
        });
      });
    }
    //get basic researh outputs by id.
    static getBasicById(req) {
      // let researchDetails = null;
      /*const queryString = 'select research_outputs.ro_id as id,pdf_link, ' +
      'title, type, publication_year,abstract as additional_info, ' +
      'proof_link, research_types.type as type, users.first_name AS Author_First_Name, ' +
      'users.last_name AS Author_Last_Name from research_outputs  ' +
          'JOIN research_types ON ro_type = type_id ' +
          'JOIN authors ON authors.ro_id = research_outputs.ro_id JOIN users ON ' +
          'users.user_id = authors.author_id WHERE research_outputs.ro_id = ?';*/

      const queryString = 'SELECT  ' +
        '`research_outputs`.`ro_id` AS `id`,  ' +
        '`research_outputs`.`pdf_link`,  ' +
        '`research_outputs`.`title`, ' +
        '`research_outputs`.`ro_type`, ' +
        '`research_outputs`.`publication_year`, ' +
        '`research_outputs`.`abstract` AS `additional_info`, ' +
        '`research_outputs`.`proof_link`, ' +
        '`research_types`.`type` AS `type`, ' +
        'GROUP_CONCAT(CONCAT(`users`.`first_name`, " ", `users`.`last_name`) SEPARATOR ", ") ' +
        '`Authors`' +
          'FROM `research_outputs`' +
            'INNER JOIN `research_types` ' +
            'ON `research_outputs`.`ro_type` = `research_types`.`type_id`' +
              'INNER JOIN `authors` ON `authors`.`ro_id` = `research_outputs`.`ro_id`' +
                'INNER JOIN `users` ON `users`.`user_id` = `authors`.`author_id` ' +
                  'WHERE `research_outputs`.`ro_id` = 7 ' +
                    'GROUP BY `research_outputs`.`ro_id`';

      return new Promise((resolve, reject) => {
        const dbCon = new DBcon();
        const connection = dbCon.getConnection();
        connection.query(queryString, [req.params.id], (err, fields) => {
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
      const sql = 'INSERT INTO research_outputs(title, publication_year, ' +
      'ro_type, additional_info, proof_link, proof_verified) VALUES (?, ?, ?, ?, ?, ?)';

      return new Promise(() => {
        this.connection.query(sql, [this.title, this.publication_year, this.type,
        this.additional_info,
        this.proof_link, this.proof_verified],
          (error) => {
          if (error) {
            throw error;
          }
        });
      });
  }

  static deleteById(req) {
    /* This method moves the data from the rese table to recycling_bin table*/
    const queryString1 = 'INSERT INTO recycling_bin SELECT * FROM research_outputs WHERE ' +
    'research_outputs.ro_id = ?';
    const queryString2 = 'DELETE FROM research_outputs WHERE research_outputs.ro_id = ?';

    return new Promise(() => {
      const dbCon = new DBcon();
      const connection = dbCon.getConnection();
      // Copying the data from the research outputs table to the recycling_bin table
      connection.query(queryString1, [req.params.id, req.params.id], (err) => {
          if (err) {
            throw (err);
          }
      });
      //Deleting data from the research_outputs table
      connection.query(queryString2, [req.params.id], (err) => {
          if (err) {
            throw (err);
          }
      });
   });
  }
}
