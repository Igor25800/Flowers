import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {OrderService} from "./order.service";


fdescribe('OrderService', () => {
  let service: OrderService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        OrderService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    service = TestBed.inject(OrderService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should addOrder',  () => {
    const mockOrder = {
      orderItems: [{
        itemId: 1057,
        quantity: 3,
        priceId: 10
      }]
    } as any
    service.addOrder(mockOrder).subscribe(order => {
      expect(order).toBeTruthy()
    })
    const req = httpTestingController.expectOne('order/checkout')
    expect(req.request.method).toEqual("POST")
    req.flush(mockOrder)
  });

  it('should getOrder',  () => {
    service.getOrder().subscribe(order => {
      expect(order).toBeTruthy();
    })
    const req = httpTestingController.expectOne('order')
    expect(req.request.method).toEqual("GET")
  });

})
