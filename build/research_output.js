'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ResearchOutput = undefined;

var _db_connection = require('./db_connection');

//
class ResearchOutput {
    constructor(title, pubYear, addInfo, type) {
        this.title = title;
        this.publication_year = pubYear;
        this.additional_info = addInfo;
        this.type = type; //Hardcoded here need to be int from Drop down values in front-end
        this.db_con = new _db_connection.DBcon();
        this.proof_verified = 0;
        this.proof_link = 'www';
        this.connection = this.db_con.getConnection(); //db connection
    }
    getProofVerified() {
        return this.proof_verified;
    }
    getProofLink() {
        return this.proof_link;
    }
    save() {
        //this function saves details of a research output.
        const sql = 'INSERT INTO research_outputs(title, publication_year, ' + 'ro_type, additional_info, proof_link, proof_verified) VALUES (?, ?, ?, ?, ?, ?)';

        return new Promise(() => {
            this.connection.query(sql, [this.title, this.publication_year, this.type, this.additional_info, this.proof_link, this.proof_verified], error => {
                if (error) {
                    throw error;
                }
            });
        });
    }
}
exports.ResearchOutput = ResearchOutput;
//# sourceMappingURL=research_output.js.map