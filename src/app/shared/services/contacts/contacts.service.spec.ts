import { TestBed } from '@angular/core/testing';

import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {ContactsService} from "./contacts.service";

fdescribe('ContactsService', () => {
  let service: ContactsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ContactsService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    service = TestBed.inject(ContactsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should addContacts',  () => {
    const mockContacts = {
      orderItems: [{
        itemId: 1057,
        quantity: 3,
        priceId: 10
      }]
    } as any

    service.addContacts(mockContacts).subscribe(contacts => {
      expect(contacts).toBeTruthy();
    })

    const req = httpTestingController.expectOne('mail')
    expect(req.request.method).toEqual("POST")
    req.flush(mockContacts)
  });

})
