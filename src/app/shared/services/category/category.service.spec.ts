import { TestBed } from '@angular/core/testing';
import {CategoryService} from "./category.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";

fdescribe('CategoryService', () => {
  let service: CategoryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        CategoryService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    service = TestBed.inject(CategoryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getCategory',  () => {
      service.getCategory().subscribe(category => {
         expect(category).toBeTruthy()
      })

    const req = httpTestingController.expectOne('categories')
    expect(req.request.method).toEqual("GET")
  });

  it('should filterCategory',  () => {
    const categoryId = 1
    service.filterCategory(categoryId).subscribe(category => {
      expect(category).toBeTruthy();
    })

    const req = httpTestingController.expectOne(`categories/${categoryId}/items`)
    expect(req.request.method).toEqual("GET")
  });
});
