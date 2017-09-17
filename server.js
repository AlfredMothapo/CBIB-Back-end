//imports
import { ResearchOutputController } from './controllers/researchOutputController';
import { UserController } from './controllers/userController';
import { LoginController } from './controllers/loginController';
import { NodeController } from './controllers/nodeController';
import { GlobalAdminController} from './controllers/globalAdminController';
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

// 4. Delete a research output by id.
app.get('/delete_research/:id',
(req, resp) => {
  ResearchOutputController.deleteById(req, resp);
});
// 5. get all users
app.get('/get-users', (req, resp) => {
  UserController.getUsers(req, resp);
});
app.get('/get-authors', (req, resp) => {
  UserController.getAuthors(req, resp);
});
// 6. login
app.post('/login', jsonParser, (req, resp) => {
  LoginController.loginUser(req, resp);
});
app.post('/create-node', jsonParser, (req, resp) => {
  NodeController.saveNode(req, resp);
});
//7. Returns all the details of the research
app.get('/detailed-research-outputs/:id',
(req, resp) => {
  ResearchOutputController.getDetailedInformation(req, resp);
});
//8. Create new account
app.post('/create-account', (req, resp) => {
  GlobalAdminController.createMember(req, resp);
});
//start the server on port 3000
app.listen(3000, () => {
  console.log('server started: listening at port:3000');
});
