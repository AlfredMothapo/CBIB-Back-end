//imports
import { DBcon } from "./db_connection";
//database connection
let db_con = new DBcon();
let connection = db_con.getConnection();
//other required modules
let stringify = require('json-stringify-safe');
let express = require('express'); //for converting circular objects to json
let cors = require("cors"); //cross-site orign
let fs = require("fs"); //file system
let app = express();
//middlewares
app.use(express.static("public")); //serve static files
app.use(cors()); //enables all cors requests
var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
//routes
app.get("/",cors(corsOptions),function (req,resp,next) { //returns all research outputs.
    var response ={};
    var sql = "select title,type,publication_year,additional_info,first_name as author from users INNER JOIN authors ON users.user_id = authors.author_id INNER JOIN research_outputs ON research_outputs.ro_id=authors.ro_id " +
        "INNER JOIN research_types ON  research_outputs.ro_type  = research_types.type_id";
    connection.query(sql,function (err,result,fields) {
        if(err) throw err;
        response.outputs = result;
        resp.end(stringify(response,null,1));
    })
})

app.listen(3000,()=>{
  console.log("server started: listening at port:3000");
});
