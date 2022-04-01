import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {ICategoryBack} from "../../interfaces/category-back.interface";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategory(): Observable<Array<ICategoryBack>> {
    return this.http.get<Array<ICategoryBack>>('categories').pipe( map((category: any) => category.content) )
  }

  filterCategory(categoryId: number): Observable<Array<ICategoryBack>> {
    return this.http.get<Array<ICategoryBack>>(`categories/${categoryId}/items`)
  }
}
