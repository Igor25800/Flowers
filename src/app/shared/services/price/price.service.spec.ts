import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {PriceService} from "./price.service";


fdescribe('PriceService', () => {
  let service: PriceService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        PriceService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    service = TestBed.inject(PriceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getPrice',  () => {
    const number = 1;
    service.getPrice(number).subscribe(price => {
      expect(price).toBeTruthy();
    })
    const req = httpTestingController.expectOne(`price/${number}`)
    expect(req.request.method).toEqual("GET")
  });
})
