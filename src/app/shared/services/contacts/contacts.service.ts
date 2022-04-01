import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {IContact} from "../../interfaces/contact.interface";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  url = environment.back;

  constructor(private http: HttpClient) {
  }

  addContacts(contacts: IContact): Observable<IContact> {
    return this.http.post<IContact>(`mail`, contacts, {
      responseType: 'text' as 'json',
    })
  }
}
