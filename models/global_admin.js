import { UserModel } from './user';

export class GlobalAdmin extends UserModel {
  constructor(fName, lName, email, accesID, pass, verToken) {
    super(fName, lName, email, accesID, pass, verToken);
    this.role = 1;
  }
  createNode() {
    
  }
  static createMember() {

  }
  static createAdmin() {

  }
}
