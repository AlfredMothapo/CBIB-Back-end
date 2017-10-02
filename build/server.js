'use strict';

var _researchOutputController = require('./controllers/researchOutputController');

var _userController = require('./controllers/userController');

var _loginController = require('./controllers/loginController');

var _nodeController = require('./controllers/nodeController');

var _globalAdminController = require('./controllers/globalAdminController');

var _recyclingBinController = require('./controllers/recyclingBinController');

//other required modules
//imports
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
app.get('/basic-research-outputs', cors(corsOptions), (req, resp) => {
  //returns all research outputs.
  _researchOutputController.ResearchOutputController.getBasic(req, resp);
});
// 2. get research_output given the id
app.get('/basic-research-output/:id', (req, resp) => {
  _researchOutputController.ResearchOutputController.getBasicById(req, resp);
});
// 3. Create a new research output.
app.post('/outputs', jsonParser, (req, resp) => {
  _researchOutputController.ResearchOutputController.saveResearchOutput(req, resp);
});

// 4. Delete a research output by id.
app.get('/delete-research/:id', (req, resp) => {
  _researchOutputController.ResearchOutputController.deleteById(req, resp);
});
// 5. get all users
app.get('/get-users', (req, resp) => {
  _userController.UserController.getUsers(req, resp);
});
app.get('/get-authors', (req, resp) => {
  _userController.UserController.getAuthors(req, resp);
});
// 6. login
app.post('/login', jsonParser, (req, resp) => {
  _loginController.LoginController.loginUser(req, resp);
});
app.post('/create-node', jsonParser, (req, resp) => {
  _nodeController.NodeController.saveNode(req, resp);
});
//7. Returns all the details of the research
app.get('/detailed-research-output/:id', (req, resp) => {
  _researchOutputController.ResearchOutputController.getDetailedInformation(req, resp);
});
//8. Create new account
app.post('/create-account', jsonParser, (req, resp) => {
  _globalAdminController.GlobalAdminController.createAccount(req, resp);
});
//.9 For user to view all their researches on the recycling bin
app.get('/user-recycling-bin/:id', (req, resp) => {
  _recyclingBinController.RecyclingBinController.userRecyclingBin(req, resp);
});
// 10. retrieve a research from the bin for a research with given ro_id
app.get('/retrieve-research/:id', (req, resp) => {
  _recyclingBinController.RecyclingBinController.retrieveResearch(req, resp);
});
app.delete('/delete-permanently/:id', jsonParser, (req, resp) => {
  _recyclingBinController.RecyclingBinController.deletePermanently(req, resp);
});
//12. edit an existing ro
app.put('/edit-research-output', jsonParser, (req, resp) => {
  _researchOutputController.ResearchOutputController.editResearchOutput(req, resp);
});
//13. Add an author to an existing research
app.post('/add-author', jsonParser, (req, resp) => {
  _researchOutputController.ResearchOutputController.addAuthor(req, resp);
});
//14. Remove an author from a research
app.delete('/remove-author', jsonParser, (req, resp) => {
  _researchOutputController.ResearchOutputController.removeAuthor(req, resp);
});
//15. For a user to view their account details
app.get('/account-details/:id', (req, resp) => {
  _userController.UserController.accountDetails(req, resp);
});
// 16. edit account details
app.put('/edit-account', jsonParser, (req, resp) => {
  _globalAdminController.GlobalAdminController.editAccount(req, resp);
});
// 17. delete user_id
app.delete('/delete-user/:id', (req, resp) => {
  _globalAdminController.GlobalAdminController.deleteAccount(req, resp);
});
// 18. returns all publications with their ids
app.get('/get-publication-types', (req, resp) => {
  _researchOutputController.ResearchOutputController.getPublicationTypes(req, resp);
});

//start the server on port 3000
app.listen(3000, () => {
  console.log('server started: listening at port:3000');
});
//# sourceMappingURL=server.js.map