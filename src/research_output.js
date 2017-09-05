import  {DBcon} from "./db_connection";

export class ResearchOutput{

    constructor(title,pub_year,add_info,proof_link,proof_verified,type){
        this.publication_year =pub_year;
        this.additional_info = add_info;
        this.proof_link = proof_link;
        this.proof_verified = proof_verified;
        this.type = type;
        this.db_con = new DBcon();
        this.connection = this.db_con.getConnection(); //db connection
    }
    save(){ //this function saves details of a research output.
        sql = "insert into post (nodeid,title,author,doc_type) values ?";
        //
        return "success";
    }
}