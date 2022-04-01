import {IUser} from "../interfaces/user.interface";


export class User implements IUser {

  constructor(
    public email: string,
    public firstName: string,
    public homeAddress: string,
    public lastName: string,
    public password: string,
    public shippingAddress: string,
    public phone: string
  ) {}
}
