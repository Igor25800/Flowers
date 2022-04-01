import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IOrder} from "../../interfaces/order.interfaces";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  addOrder(order: IOrder): Observable<IOrder> {
    return this.http.post<IOrder>('order/checkout', order, {
      responseType: 'text' as 'json',
    })
  }

  getOrder(): Observable<Array<IOrder>> {
    return this.http.get<Array<IOrder>>('order')
  }
}
