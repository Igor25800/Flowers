import {ICartItem} from "./cart.interface";
import {IFlowerBack} from "./flowers-back.interface";

export interface IOrder {
  deliveryName: string,
  deliveryAddress: string,
  email: string,
  orderStatus?: string,
  paymentType: string,
  phone: string,
  productItems: Array<ICartItem | any>,
  text?: string
  id?: number
  creationDate?: Date;
}
