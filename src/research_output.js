import  {DBcon} from "./db_connection";

export class ResearchOutput{

    constructor(nodeid,basicInfo,detailedInfo){
        this.basicInfo = basicInfo;
        this.detailedInfo = detailedInfo;
        this.nodeId = nodeid;
        this.db_con = new DBcon();
        this.connection = this.db_con.getConnection(); //db connection
    }
    save(){ //this function saves details of a research output.
        sql = "insert into post (nodeid,title,author,doc_type) values ?";
        //
        return "success";
    }
}