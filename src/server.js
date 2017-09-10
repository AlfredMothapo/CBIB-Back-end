//imports
import { DBcon } from './db_connection';
import { ResearchOutput } from './research_output';
//database connection
const dbCon = new DBcon();
const connection = dbCon.getConnection();
//other required modules
const stringify = require('json-stringify-safe');
const express = require('express'); //for converting circular objects to json
const cors = require('cors'); //cross-site orign
const bodyParser = require('body-parser');


const app = express();
//middlewares
app.use(express.static('public')); //serve static files
app.use(cors()); //enables all cors requests

const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const jsonParser = bodyParser.json();
//routes
app.get('/basic-research-outputs', cors(corsOptions),
(req, resp) => { //returns all research outputs.
    const response = {};
    const sql = 'select research_outputs.ro_id as id,title,type,publication_year,' +
    'additional_info,first_name as Author_First_Name ' +
    ', last_name as Author_Last_Name from users INNER JOIN authors ON ' +
    'users.user_id = authors.author_id INNER JOIN research_outputs ON ' +
    ' research_outputs.ro_id=authors.ro_id ' +
        'INNER JOIN research_types ON  research_outputs.ro_type  = research_types.type_id';
    connection.query(sql, (err, result) => {
        if (err) throw err;
        response.outputs = result;
        resp.end(stringify(response, null, 1));
    });
});
app.get('/detailed_view/:id',
(req, res) => {
    let researchDetails = null;
    const queryString = 'select research_outputs.ro_id as id, ' +
    'title, type, publication_year, additional_info, ' +
    'proof_link, research_types.type as type, users.first_name AS Author_First_Name, ' +
    'users.last_name AS Author_Last_Name from research_outputs  ' +
        'JOIN research_types ON ro_type = type_id ' +
        'JOIN authors ON authors.ro_id = research_outputs.ro_id JOIN users ON ' +
        'users.user_id = authors.author_id WHERE research_outputs.ro_id = ?';

    connection.query(queryString, [req.params.id],
      (err, result) => {
        if (err) throw err;
        researchDetails = result;
        res.end(stringify(researchDetails, null, 1));
    });
});
app.post('/outputs', jsonParser, (req, resp) => {
  const output = new ResearchOutput(req.body.title, req.body.publication_year,
   req.body.additional_info, req.body.text, req.body.type);
   output.save();
  resp.send('success');
});
app.listen(3500, () => {
  console.log('server started: listening at port:3500');
});
