import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {PaymentsService} from "./payments.service";


fdescribe('PaymentsService', () => {
  let service: PaymentsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        PaymentsService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    service = TestBed.inject(PaymentsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should addPayments',  () => {
    const mockPayments = {
      orderItems: [{
        itemId: 1057,
        quantity: 3,
        priceId: 10
      }]
    } as any
    service.addPayments(mockPayments).subscribe(order => {
      expect(order).toBeTruthy()
    })
    const req = httpTestingController.expectOne('payments/charge')
    expect(req.request.method).toEqual("POST")
    req.flush(mockPayments)
  });
})
