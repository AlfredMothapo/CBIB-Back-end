"use strict";

var _db_connection = require("./db_connection");

var _research_output = require("./research_output");

//database connection
//imports
let db_con = new _db_connection.DBcon();
let connection = db_con.getConnection();
//other required modules
let stringify = require('json-stringify-safe');
let express = require('express'); //for converting circular objects to json
let cor = require("cors"); //cross-site orign
let fs = require("fs"); //file system
let app = express();
//middlewares
app.use(express.static("public")); //serve static files
//routes
app.get("/", function (req, resp) {
    var response = {};
    response.message = "Hello world"; //response messag
    resp.end(stringify(response, null, 1)); //returns JSON
});
app.get("/home", function (res, resp) {
    //returns all research outputs.
    var response = {};
    var sql = "select * from post";
    connection.query(sql, function (err, result, fields) {
        if (err) throw err;
        response.outputs = result;
        resp.end(stringify(response, null, 1));
    });
});

app.listen(3000, () => {
    console.log("server started: listening at port:3000");
});
//# sourceMappingURL=server.js.map