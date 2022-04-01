export interface ICart {
  orderItems: Array<ICartItem>
}


export interface ICartItem {
  id?: number
  itemId: number;
  priceId: number;
  quantity: number;
}
