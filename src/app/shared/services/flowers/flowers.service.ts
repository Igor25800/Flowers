import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IFlowerBack} from "../../interfaces/flowers-back.interface";
import {IFlowersStandard} from "../../interfaces/flowersStandard.interface";

@Injectable({
  providedIn: 'root'
})
export class FlowersService {


  constructor(private http: HttpClient) { }

  getFLowers(page: number): Observable<any> {
    return this.http.get<Array<any>>(`items?page=${page}&size=9`)
  }

  getFLowersSearch(): Observable<IFlowersStandard> {
    return this.http.get<IFlowersStandard>(`items?size=9`)
  }


  getSearch(name: string): Observable<Array<IFlowerBack>> {
    return this.http.get<Array<IFlowerBack>>(`items/search?name=${name}`)
  }

  detailsFlowers(id: number): Observable<IFlowerBack> {
    return this.http.get<IFlowerBack>(`items/${id}`)
  }

  filterFlowers(params: any): Observable<IFlowerBack> {
      return  this.http.get<IFlowerBack>('items', {params: params})
  }

  sortFlowers(name: string, direction: string) {
     return this.http.get(`items?direction=${direction}&sortProperty=${name}&size=9`)
  }
}
