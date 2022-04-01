import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {ChatService} from "../../shared/services/chat/chat.service";
import {StompService} from "../../shared/services/stomp/stomp.service";
import {IChat, IMessages} from "../../shared/interfaces/chat.interface";
import {FormControl} from "@angular/forms";
import {switchMap, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked, OnDestroy {

  chat  = new FormControl('');
  isDialog = false;
  arrayChat: Array<IMessages> = [];
  userCHat!: IChat;
  idUser!: number;
  unsubscribe$: Subject<any> = new Subject<any>();
  @ViewChild('scrollMe') comment!: ElementRef;

  constructor(
    private chatService: ChatService,
    public stormService: StompService,
  ) {
    this.getChat();
  }

  ngOnInit(): void {
    this.getChatEvent();
  }

  ngAfterViewChecked(): void {
    this.scrollBottom();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  scrollBottom(): void {
    try {
      this.comment.nativeElement.scrollTop = this.comment.nativeElement.scrollHeight
    } catch (err) {}
  }

  getChatEvent(): void {
    this.stormService.adminActivate$.pipe(
      switchMap(() => {
        return this.chatService.getChat()
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe(chat => {
      this.arrayChat = chat.messages.sort((a: any, b: any) => a.id - b.id);
    })
  }

  getChat(): void {
    this.chatService.getChat().subscribe((chat: IChat) => {
      this.stormService.adminId = chat.user.id;
      this.idUser = chat.user.id;
      this.stormService.id = chat.id;
      this.arrayChat = chat.messages.sort((a: any, b: any) => a.id - b.id)
      this.userCHat = chat;
      this.stormService.initializeWebSocketConnection()
    })
  }

  toggleDialog(): void {
    this.isDialog = !this.isDialog;
  }

  send(): void {
    this.stormService.sendMessage(this.userCHat, this.chat.value);
    this.chat.reset();
  }
}
