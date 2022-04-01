import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IChat} from "../../interfaces/chat.interface";


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  getChat(): Observable<IChat> {
    return this.http.get<IChat>('chats/user')
  }
}
