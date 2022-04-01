import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IPayments} from "../../interfaces/payments.interface";

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(
    private http: HttpClient
  ) { }

  addPayments(payments: IPayments): Observable<IPayments> {
    return  this.http.post<IPayments>('payments/charge', payments, {
      responseType: 'text' as 'json',
    })
  }
}
