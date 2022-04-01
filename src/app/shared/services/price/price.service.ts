import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IPrice} from "../../interfaces/price.interface";

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  constructor(private http: HttpClient) {
  }

  getPrice(number: number): Observable<Array<IPrice>>  {
    return this.http.get<Array<IPrice>>(`price/${number}`)
  }
}
