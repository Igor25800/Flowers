export interface IPayments {
  amount: number,
  currency: string,
  productOrderId: number,
  stripeEmail: string,
  stripeToken: string
}
