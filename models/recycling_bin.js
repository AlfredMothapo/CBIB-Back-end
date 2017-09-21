import { DBcon } from '../db_connection';

const con = new DBcon();
const connection = con.getConnection();

export class RecyclingBinModel {
  // Return items for a person with a given id
  static userRecyclingBin(id) {
    const sqlQuery = 'SELECT recycling_bin.ro_id AS id, title, type, publication_year, ' +
    'proof_verified,proof_link,  pdf_link, abstract as additional_info, GROUP_CONCAT(CONCAT(' +
    'users.first_name, " ", users.last_name) SEPARATOR ", ") Authors FROM recycling_bin JOIN ' +
    'authors ON authors.ro_id = recycling_bin.ro_id JOIN research_types ON recycling_bin.ro_type ' +
    '= research_types.type_id JOIN users ON users.user_id = authors.author_id WHERE ' +
    'authors.author_id =? GROUP BY recycling_bin.ro_id';

    return new Promise((resolve, reject) => {
      connection.query(sqlQuery, [id], (err, fields) => {
          if (err) {
            return reject(err);
          }
          resolve(fields);
      });
    });
  }

  //Return all the researhc in the recycling bin for an entire node
  static nodeRecyclingBin(nodeId, resp) {
    resp.end('');
  }

  // To permanently delete a research with given ro_id
  static deletePermanently(roId, resp) {
    const sqlQuery1 = 'DELETE * FROM recycling_bin WHERE ro_id = ?';
    const sqlQuery2 = 'DELETE * FROM authors WHERE ro_id = ?';

    return new Promise(() => {
      // delete from recycling bin
      connection.query(sqlQuery1, [roId], (err) => {
          if (err) {
            throw (err);
          }
      });
      // deleting author from the authors table
      connection.query(sqlQuery2, [roId], (err) => {
          if (err) {
            throw (err);
          }
      });
      resp.end('success');
    });
  }

  // retrieve a research out with a given ro_id
  static retrieveResearch(roId, resp) {
    const queryString1 = 'INSERT INTO research_outputs(ro_id, title, publication_year, ' +
    'ro_type, abstract, proof_link, proof_verified, pdf_link) SELECT ro_id, title, ' +
    'publication_year, ro_type, abstract, proof_link, proof_verified, pdf_link FROM ' +
    'recycling_bin WHERE recycling_bin.ro_id = ?';
//    const queryString2 = 'DELETE FROM recycling_bin WHERE research_outputs.ro_id = ?';
    return new Promise(() => {
      //Moving research from the recycling bin to research_outputs
      connection.query(queryString1, [roId], (err) => {
        if (err) {
          throw (err);
        }
      });
      //Deleting the research on the database
  /*    connection.query(queryString2, [roId], (err) => {
        if (err) {
          throw (err);
        }
      });*/
      resp.end('success');
    });
  }
}
