import { DBcon } from '../db_connection';

const con = new DBcon();
const connection = con.getConnection();

export class NodeModel {
  static createNode(nodeName, nodeDescription, admin, location) {
    const sqlQuery = 'INSERT INTO nodes (node_name, about_node,location, node_admin)' +
    ' values (?,?,?,?)';
    const sqlQuery2 = 'INSERT INTO membership (node_id,user_id)' +
    ' values ((SELECT node_id FROM nodes WHERE node_name = ?),?)';

    return new Promise(() => {
      connection.query(sqlQuery, [nodeName, nodeDescription, location, admin], (err) => {
        if (err) {
          throw (err);
        }
      });
      connection.query(sqlQuery2, [nodeName, admin], (err) => {
        if (err) {
          throw (err);
        }
      });
    });
  }

  static getNodes() {
    const sqlQuery = 'SELECT node_id, node_name AS name, about_node ' +
    'AS description, location, node_admin as nodeAdmin FROM nodes';

    return new Promise((resolve, reject) => {
      connection.query(sqlQuery, (err, fields) => {
          if (err) {
            return reject(err);
          }
          resolve(fields);
      });
    });
  }

  static getNodeById(nodeId) {
    const sqlQuery = 'SELECT node_id, node_name AS name, about_node ' +
    'AS description, location, node_admin as nodeAdmin FROM nodes WHERE node_id = ?';

    return new Promise((resolve, reject) => {
      connection.query(sqlQuery, [nodeId], (err, fields) => {
          if (err) {
            return reject(err);
          }
          resolve(fields[0]);
      });
    });
  }
}
