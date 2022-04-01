import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {TestBed} from '@angular/core/testing';
import { CartService } from './cart.service';

fdescribe('CartService', () => {
  let service: CartService;
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        CartService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    service = TestBed.inject(CartService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it( 'should getCart', () => {
    service.getCart().subscribe(cart => {
        expect(cart).toBeTruthy()
      })
    const req = httpTestingController.expectOne('cart?tempId=1')
    expect(req.request.method).toEqual("GET")
  })

  it('should addCart', () => {
    const mockCart = {
      orderItems: [{
        itemId: 1057,
        quantity: 3,
        priceId: 10
      }]
    } as any
    service.addCart(mockCart).subscribe(cart => {
        expect(cart).toBeTruthy()
      })
    const req = httpTestingController.expectOne('cart/item')
    expect(req.request.method).toEqual("POST")
    req.flush(mockCart)
  })

  it('should editCart',  () => {
    const mockCart = {
      orderItems: [{
        itemId: 1057,
        quantity: 3,
        priceId: 10
      }]
    } as any
    service.editCart(mockCart).subscribe(cart => {
      expect(cart).toBeTruthy()
    })
    const req = httpTestingController.expectOne('cart')
    expect(req.request.method).toEqual("PUT")
    req.flush(mockCart)
  });

  it('should deleteCartItem',  () => {
    const id = 10
    service.deleteCartItem(id).subscribe(cart => {
      expect(cart).toBeTruthy()
    })
    const req = httpTestingController.expectOne(`cart/item/${id}`)
    expect(req.request.method).toEqual("DELETE")
    req.flush(id)
  });

  it('should createCart',  () => {
    const mockCart = {
      orderItems: [{
        itemId: 1057,
        quantity: 3,
        priceId: 10
      }]
    } as any
    service.createCart(mockCart).subscribe(cart => {
      expect(cart).toBeTruthy()
    })
    const req = httpTestingController.expectOne(`cart`)
    expect(req.request.method).toEqual("POST")
    req.flush(mockCart)
  });

  afterEach(() => {
    httpTestingController.verify();
  })
})

