import { DBcon } from '../db_connection';

const con = new DBcon();
const connection = con.getConnection();
export class PublicationModel {
  static getPublications() {
    const sql = 'select type_id,type from research_types';
    return new Promise((reject, resolve) => {
      connection.query(sql, (err, fields) => {
        if (err) reject(err);
        resolve(fields);
      });
    });
  }

  static getPublicationsById(publicationId) {
    const sql = 'select type_id,type from research_types';
    return new Promise((reject, resolve) => {
      connection.query(sql, (err, fields) => {
        if (err) reject(err);
        resolve(fields);
      });
    });
  }
}
