import {IContact} from "../interfaces/contact.interface";

export class Contact implements IContact {
  constructor(
    public name: string,
    public phone: string,
    public text: string
  ) {}
}
