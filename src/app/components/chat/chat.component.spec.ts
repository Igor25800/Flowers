import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatComponent } from './chat.component';
import {ChatService} from "../../shared/services/chat/chat.service";
import {StompService} from "../../shared/services/stomp/stomp.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {of} from "rxjs";
import {IChat} from "../../shared/interfaces/chat.interface";
import {ReactiveFormsModule} from "@angular/forms";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";


fdescribe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let service: ChatService;
  let stomp : StompService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [ChatService, StompService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(ChatService);
    stomp = TestBed.get(StompService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getChat',  () => {
    const obj: IChat = {id: 1, user:{id: 2}, messages:[{message:'ss', id:10, sender:{id: 2}} , {message:'igor', id:9, sender:{id: 2}}  ]}
    const spy = spyOn(service, 'getChat').and.returnValue(of(obj));
    component.getChat();
    expect(spy).toHaveBeenCalled();
    expect(component.idUser).toBe(obj.user.id);
    expect(component.arrayChat).toEqual([ {message:'igor', id:9, sender:{id: 2}} , {message:'ss', id:10, sender:{id: 2}} ]);
    expect(component.userCHat).toEqual(obj)
  });

  it('should toggleDialog',  () =>  {
    component.isDialog = false;
    component.toggleDialog();
    expect(component.isDialog).toBeTruthy();
    component.toggleDialog();
    expect(component.isDialog).toBeFalsy();
  });

  it('should send',  () =>  {
    component.userCHat = {id: 1, user:{id: 2}, messages:[{message:'ss', id:10, sender:{id: 2}} , {message:'igor', id:9, sender:{id: 2}}  ]}
    const chat = spyOn(service, 'getChat').and.returnValue(of(component.userCHat))
    const spy = spyOn(stomp, 'sendMessage').and.returnValue();
    component.chat.patchValue('igor')
    component.send();
    component.chat.patchValue('igor')
    expect(spy).toHaveBeenCalledWith(component.userCHat, component.chat.value)
    component.getChat();
    expect(chat).toHaveBeenCalled()
    expect(component.idUser).toBe(component.userCHat.user.id);
    expect(component.arrayChat).toEqual([ {message:'igor', id:9, sender:{id: 2}} , {message:'ss', id:10, sender:{id: 2}} ]);
    expect(component.userCHat).toEqual(component.userCHat)
  });
});
