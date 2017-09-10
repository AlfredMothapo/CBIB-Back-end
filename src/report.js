import {DBcon} from "./db_connection";
let PDFDocument = require ("pdfkit");
let blobStream = require("blob-stream");
let fs = require("fs");
export class report{

    constructor(){
        this.connection = new DBcon(); //the constructor creates a new  connection object.
    }
    generateReport(){
        var sql = "select title,type,publication_year,additional_info,first_name as author from users INNER JOIN authors ON users.user_id = authors.author_id INNER JOIN research_outputs ON research_outputs.ro_id=authors.ro_id " +
            "INNER JOIN research_types ON  research_outputs.ro_type  = research_types.type_id";

        //
        this.connection.getConnection().query(sql,function (err,result) {
            var myDoc = new PDFDocument;
            myDoc.pipe(fs.createWriteStream("../public/reports/basic_report.pdf"));
            myDoc.font('Times-Roman').fontSize(48).text('Report',150,100);

            if(err) throw err;
            var i=0;
            var line = 20 ;
            for( i;i<result.length;i++){
                console.log(result[i].title);
                myDoc.font('Times-Roman')
                    .fontSize(12)
                    .text(result[i].title, 10, 160+line);
                line+=20;
            }
            myDoc.rect(myDoc.x, 40, 500, myDoc.y).stroke()  //
            myDoc.end();
        })
        this.connection.close_connection(); //close mysql Connection
    }

}

var rs = new report();
rs.generateReport();