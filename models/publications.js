import { DBcon } from '../db_connection';

const con = new DBcon();
const connection = con.getConnection();
export class PublicationModel {
  static getPublications() {
    const sql = 'select type_id,type from research_types';
    return new Promise((resolve, reject) => {
      connection.query(sql, (err, fields) => {
        if (err) {
          return reject(err);
        } 
        resolve(fields);
      });
    });
  }

  static getPublicationsById(publicationId) {
    const sql = 'SELECT type_id, type FROM research_types WHERE type_id=?';
    return new Promise((resolve, reject) => {
      connection.query(sql, [publicationId], (err, fields) => {
        if (err) {
          return reject(err);
        }
        resolve(fields[0]);
      });
    });
  }
}
