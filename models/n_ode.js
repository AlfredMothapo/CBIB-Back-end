import { DBcon } from '../db_connection';

const con = new DBcon();
const connection = con.getConnection();

export class NodeModel {
  static createNode(nodeName, nodeDescription) {
    const sqlQuery = 'INSERT INTO nodes (node_name, about_node)' +
    ' values (?,?)';
    const sqlQuery2 = 'INSERT INTO membership (node_id,user_id)' +
    ' values (?,?)';

    return new Promise((resolve, reject) => {
      connection.query(sqlQuery, [nodeName, nodeDescription], (err, fields) => {
          if (err) return reject(err);
          resolve(fields);
      });
    });
  }
}
