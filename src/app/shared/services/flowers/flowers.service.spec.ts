import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {FlowersService} from "./flowers.service";


fdescribe('FlowersService', () => {
  let service: FlowersService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        FlowersService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    service = TestBed.inject(FlowersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getFLowers', () => {
    const page = 1
    service.getFLowers(page).subscribe(flower => {
      expect(flower).toBeTruthy();
    })
    const req = httpTestingController.expectOne(`items?page=${page}&size=9`)
    expect(req.request.method).toEqual("GET")
  });

  it('should getFLowersSearch', () => {
    service.getFLowersSearch().subscribe(flower => {
      expect(flower).toBeTruthy();
    })
    const req = httpTestingController.expectOne('items?size=9')
    expect(req.request.method).toEqual("GET")
  });

  it('should getSearch', () => {
    const name = 'rose';
    service.getSearch(name).subscribe(flower => {
      expect(flower).toBeTruthy();
    })
    const req = httpTestingController.expectOne(`items/search?name=${name}`)
    expect(req.request.method).toEqual("GET")
  });

  it('should detailsFlowers', () => {
    const id = 1;
    service.detailsFlowers(id).subscribe(flower => {
      expect(flower).toBeTruthy();
    })
    const req = httpTestingController.expectOne(`items/${id}`)
    expect(req.request.method).toEqual("GET")
  });

  it('should filterFlowers', () => {
    const params = {page: '9'} as any;
    service.filterFlowers(params).subscribe(flower => {
      expect(flower).toBeTruthy();
    })
    const req = httpTestingController.expectOne('items?page=9')
    expect(req.request.method).toEqual("GET")
  });

  it('should sortFlowers', () => {
    const name = 'igor';
    const direction = 'ADG';
      service.sortFlowers(name, direction).subscribe(flower => {
        expect(flower).toBeTruthy();
      })
    const req = httpTestingController.expectOne(`items?direction=${direction}&sortProperty=${name}&size=9`)
    expect(req.request.method).toEqual("GET")
  });
})
