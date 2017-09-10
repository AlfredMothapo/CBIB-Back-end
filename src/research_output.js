import { DBcon } from './db_connection';
//
export class ResearchOutput {
    constructor(title, pubYear, addInfo, type, firstName, lastName) {
        this.title = title;
        this.publication_year = pubYear;
        this.additional_info = addInfo;
        this.type = type; //Hardcoded here need to be int from Drop down values in front-end
        this.db_con = new DBcon();
        this.proof_verified = 0;
        this.proof_link = 'www';
        this.first_name = firstName;
        this.last_name = lastName;
        this.connection = this.db_con.getConnection(); //db connection
    }
    getProofVerified() {
      return this.proof_verified;
    }
    getProofLink() {
      return this.proof_link;
    }
    save() { //this function saves details of a research output.
        const sql = 'INSERT INTO research_outputs(title, publication_year, ' +
        'ro_type, additional_info, proof_link, proof_verified) VALUES (?, ?, ?, ?, ?, ?)';

        return new Promise(() => {
             this.connection.query(sql, [this.title, this.publication_year, this.type,
               this.additional_info,
               this.proof_link, this.proof_verified],
                (error) => {
                if (error) {
                  throw error;
                }
            });
        });
    }
    // createAuthor() {
    //   const sql = 'INSERT INTO users (first_name, last_name,' +
    //   'email,date_registered,password,verification_token,verified_status,access_id),' +
    //   ' values(?,?,?,?,?,?,?,?)';
    //   this.connection.query(sql, [this.first_name, this.last_name, 'someone@example.com',
    // '2017/02/05', 'weweetwtwrtrwttw', 0, 1], (err) => {
    //   if (err) {
    //     throw err;
    //   }
    //   console.log('user created');
    // });
    // const sql2 = 'INSERT INTO authors';
    // }
}
