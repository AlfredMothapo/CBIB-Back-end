"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ResearchOutput = undefined;

var _db_connection = require("./db_connection");

class ResearchOutput {

    constructor(nodeid, basicInfo, detailedInfo) {
        this.basicInfo = basicInfo;
        this.detailedInfo = detailedInfo;
        this.nodeId = nodeid;
        this.db_con = new _db_connection.DBcon();
        this.connection = this.db_con.getConnection(); //db connection
    }
    save() {
        //this function saves details of a research output.
        sql = "insert into post (nodeid,title,author,doc_type) values ?";
        //
        return "success";
    }
}
exports.ResearchOutput = ResearchOutput;
//# sourceMappingURL=research_output.js.map