import { DBcon } from '../db_connection';

const con = new DBcon();
const connection = con.getConnection();

export class NodeModel {
  static createNode(nodeName, nodeDescription, admin, location) {
    const sqlQuery = 'INSERT INTO nodes (node_name, about_node,location)' +
    ' values (?,?,?)';
    const sqlQuery2 = 'INSERT INTO membership (node_id,user_id)' +
    ' values ((SELECT node_id FROM nodes WHERE node_name = ?),?)';

    return new Promise(() => {
      connection.query(sqlQuery, [nodeName, nodeDescription, location], (err) => {
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
}
