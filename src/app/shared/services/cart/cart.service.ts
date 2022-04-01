import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {ICart, ICartItem} from "../../interfaces/cart.interface";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartSubject$ = new Subject();

  constructor(private http: HttpClient) { }

  addCart(cart: ICartItem): Observable<ICart> {
    return this.http.post<ICart>('cart/item', cart,{
      responseType: 'text' as 'json',
    })
  }

  getCart(): Observable<Array<ICartItem>> {
    return  this.http.get<Array<ICartItem>>('cart?tempId=1').pipe(
      map((cart:any) => cart.orderItems)
    )
  }

  editCart(cart: ICart): Observable<ICart> {
    return  this.http.put<ICart>('cart', cart)
  }

  deleteCartItem(id?: number): Observable<void> {
    return this.http.delete<void>(`cart/item/${id}`)
  }

  createCart(cart: ICart  ): Observable<ICart> {
    return this.http.post<ICart>('cart', cart)
  }
}
