//imports
import { ResearchOutputController } from './controllers/researchOutputController';
import { UserController } from './controllers/userController';
//other required modules
const express = require('express'); //for converting circular objects to json
const cors = require('cors'); //cross-site orign
const bodyParser = require('body-parser');

const app = express(); //express app
//middlewares
app.use(express.static('public')); //serve static files
app.use(cors()); //enables all cors requests

const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const jsonParser = bodyParser.json(); //process json post request's body
//==============================================================================
                            ///routes
//==============================================================================

// 1.get basic research_outputs
app.get('/basic-research-outputs', cors(corsOptions),
(req, resp) => { //returns all research outputs.
  ResearchOutputController.getBasic(req, resp);
});
// 2. get research_output given the id
app.get('/detailed_view/:id',
(req, resp) => {
  ResearchOutputController.getBasicById(req, resp);
});
// 3. Create a new research output.
app.post('/outputs', jsonParser, (req, resp) => {
  ResearchOutputController.saveResearchOutput(req, resp);
});
app.get('/get-users', (req, resp) => {
  UserController.getUsers(req, resp);
});
//start the server on port 3000
app.listen(3000, () => {
  console.log('server started: listening at port:3000');
});
