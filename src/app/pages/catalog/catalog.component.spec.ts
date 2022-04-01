import {ComponentFixture, TestBed} from "@angular/core/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {CatalogComponent} from "./catalog.component";
import {FlowersService} from "../../shared/services/flowers/flowers.service";
import {RouterTestingModule} from "@angular/router/testing";
import {CategoryService} from "../../shared/services/category/category.service";
import {CartService} from "../../shared/services/cart/cart.service";
import {of} from "rxjs";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";


fdescribe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;
  let flowerService: FlowersService;
  let categoryServices: CategoryService;
  let cartService: CartService


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, ToastrModule.forRoot(), RouterTestingModule],
      providers: [FlowersService, ToastrService, CategoryService, CartService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    flowerService = TestBed.get(FlowersService);
    categoryServices = TestBed.get(CategoryService);
    cartService = TestBed.get(CartService)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should getFlowers', () => {
    const obj = {totalElements: 1, totalPages: 2, number: 2, content: [1, 2, 3]};
    const spy = spyOn(flowerService, 'getFLowers').and.returnValue(of(obj));
    component.page = 2
    component.getFlowers();
    expect(component.totalElements).toBe(obj.totalElements);
    component.getPages(obj.totalPages);
    expect(spy).toHaveBeenCalledWith(component.page)
    expect(component.arrayPage).toEqual([0, 1]);
    expect(component.page).toBe(obj.number);
    expect(component.arrFlower).toEqual(obj.content as any);
    expect(component.objFlower).toEqual(obj)
  });

  it('should getCategory', () => {
    const category = [{category: 'flowers', id: 1}]
    const spy = spyOn(categoryServices, 'getCategory').and.returnValue(of(category as any));
    component.getCategory();
    expect(spy).toHaveBeenCalled();
    expect(categoryServices).toBeTruthy();
    expect(component.arrCategoryFilter).toEqual(category as any)
  });

  it('should getCart', () => {
    const cart = [{id: 1, itemId: 1, priceId: 100, quantity: 2}]
    const spy = spyOn(cartService, 'getCart').and.returnValue(of(cart));
    component.getCart();
    expect(spy).toHaveBeenCalled();
    expect(cartService).toBeTruthy()
    expect(component.cartArray).toEqual(cart)
  })

  it('should getPages', () => {
    component.getPages(2)
    expect(component.arrayPage).toEqual([0, 1])
  });

  it('should changer', () => {
    component.change({array: {content: [1, 2, 3]}, totalElement: 1})
    expect(component.arrFlower).toEqual([1, 2, 3] as any)
    expect(component.totalElements).toBe(1)
  });

  it('should getPages', () => {
    component.getPages(2);
    expect(component.arrayPage).toEqual([0, 1]);
  });

  it('should pageNext', () => {
    component.isPage = true;
    component.pageNext(2)
    expect(component.isPage).toBeFalsy()
    expect(component.page).toBe(2)
  });

  it('should activePage', () => {
    component.page = 2
    expect(component.activePage(2)).toBe(true)
  });

  it('should selected', () => {
    component.selected({value: 'igor fedor'});
    expect(component.arraySort).toEqual(['igor', 'fedor'])
  });

})

