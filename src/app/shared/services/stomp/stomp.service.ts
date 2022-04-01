import {Injectable} from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';
import {Subject} from "rxjs";
import {environment} from "../../../../environments/environment";
import {IChat} from "../../interfaces/chat.interface";


@Injectable({
  providedIn: 'root'
})
export class StompService {
  public stompClient!: any;
  id!: number;
  adminId!: number
  adminActivate$: Subject<void> = new Subject<void>()

  initializeWebSocketConnection(): void {
    const serverUrl = environment.sock;
    const ws = new SockJS(serverUrl);
    this.stompClient = StompJs.Stomp.over(ws);
      this.stompClient.connect({}, (name: string): void =>  {
        if(this.id) {
          this.stompClient.subscribe(`/topic/chat/${this.id}/messages`, (mess: any) => {
            this.adminActivate$.next();
          })
        }
      });
  }

  sendMessage(message: IChat, name: string): void {
    let chatMessage = {
      sender: {id: message.user.id},
      message: name,
      chatRoom: {id: message.id}
    };
    this.stompClient.send('/app/message' , {}, JSON.stringify(chatMessage));
  }
}
