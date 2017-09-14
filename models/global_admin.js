import { UserModel } from './user';

export class GlobalAdmin extends UserModel {
  constructor(fName, lName, email, accesID, pass, verToken) {
    super(fName, lName, email, accesID, pass, verToken);
    this.role = 1;
  }
  createNode() {
    console.log('Hello');
  }
  static createMember() {

  }
  static createAdmin() {

  }
}

const ad = new GlobalAdmin('alfred', 'mothapo', '1234', 'dsds', 'we', 'eww');
ad.createNode();
