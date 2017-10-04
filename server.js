//imports
import { PublicationController } from './controllers/publicationController';
import { ResearchOutputController } from './controllers/researchOutputController';
import { UserController } from './controllers/userController';
import { LoginController } from './controllers/loginController';
import { NodeController } from './controllers/nodeController';
import { GlobalAdminController } from './controllers/globalAdminController';
import { RecyclingBinController } from './controllers/recyclingBinController';
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
app.get('/basic-research-output/:id',
(req, resp) => {
  ResearchOutputController.getBasicById(req, resp);
});
// 3. Create a new research output.
app.post('/outputs', jsonParser, (req, resp) => {
  ResearchOutputController.saveResearchOutput(req, resp);
});

// 4. Delete a research output by id.
app.get('/delete-research/:id',
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
app.get('/detailed-research-output/:id',
(req, resp) => {
  ResearchOutputController.getDetailedInformation(req, resp);
});
app.get('/detailed-research-outputs',
(req, resp) => {
  ResearchOutputController.getDetailed(req, resp);
});
//8. Create new account
app.post('/create-user', jsonParser, (req, resp) => {
  GlobalAdminController.createAccount(req, resp);
});
//.9 For user to view all their researches on the recycling bin
app.get('/user-recycling-bin/:id', (req, resp) => {
  RecyclingBinController.userRecyclingBin(req, resp);
});
// 10. retrieve a research from the bin for a research with given ro_id
app.get('/retrieve-research/:id', (req, resp) => {
  RecyclingBinController.retrieveResearch(req, resp);
});
app.delete('/delete-permanently/:id', jsonParser, (req, resp) => {
  RecyclingBinController.deletePermanently(req, resp);
});
//12. edit an existing ro
app.put('/edit-research-output', jsonParser, (req, resp) => {
  ResearchOutputController.editResearchOutput(req, resp);
});
//13. Add an author to an existing research
app.post('/add-author', jsonParser, (req, resp) => {
  ResearchOutputController.addAuthor(req, resp);
});
//15. For a user to view their account details
app.get('/account-details/:id', (req, resp) => {
  UserController.accountDetails(req, resp);
});
// 16. edit account details
app.put('/edit-account', jsonParser, (req, resp) => {
  GlobalAdminController.editAccount(req, resp);
});
// 17. delete user_id
app.delete('/delete-user/:id', (req, resp) => {
  GlobalAdminController.deleteAccount(req, resp);
});
// 18. returns all publications with their ids
app.get('/get-publication-types', (req, resp) => {
  ResearchOutputController.getPublicationTypes(req, resp);
});
// 19. for user to confirm their account with a verification token
app.get('/account-confirmation/:id', (req, resp) => {
  UserController.accountConfirmation(req, resp);
});
//. 20. for user to set a password for the first time
app.put('/set-password/', jsonParser, (req, resp) => {
  UserController.setPassword(req, resp);
});
app.get('/get-publication-types', (req, resp) => {
  PublicationController.getPublications(req, resp);
});
app.get('/get-user/:id', (req, resp) => {
  UserController.getUserById(req, resp);
});
app.get('/get-publication-type/:id', (req, resp) => {
  PublicationController.getPublicationsById(req, resp);
});
app.get('/get-nodes', (req, resp) => {
  NodeController.getNodes(req, resp);
});
app.get('/get-node/:id', (req, resp) => {
  NodeController.getNodeById(req, resp);
});
//start the server on port 3000
app.listen(3000, () => {
  console.log('server started: listening at port:3000');
});
