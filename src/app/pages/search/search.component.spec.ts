import {ComponentFixture, TestBed} from "@angular/core/testing";
import {FlowersService} from "../../shared/services/flowers/flowers.service";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {SearchComponent} from "./search.component";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {CategoryService} from "../../shared/services/category/category.service";
import {of} from "rxjs";
import {FormsModule} from "@angular/forms";


fdescribe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let categoryService: CategoryService;
  let flowerService: FlowersService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, ToastrModule.forRoot(), FormsModule],
      providers: [FlowersService, ToastrService, CategoryService]
    })
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.get(CategoryService);
    flowerService = TestBed.get(FlowersService)
    fixture.detectChanges()
  })

  it('should getCategory', () => {
    const array = [1, 2, 3] as any
    const spy = spyOn(categoryService, 'getCategory').and.returnValue(of(array))
    component.getCategory();
    expect(spy).toHaveBeenCalled();
    expect(component.arrCategoryFilter).toEqual(array)
  });

  it('should getFlowers', () => {
    const obj = {totalElements: 1, totalPages: 2, number: 2, content: [1, 2, 3]} as any;
    const spy = spyOn(flowerService, 'getFLowersSearch').and.returnValue(of(obj));
    component.page = 2;
    component.getFlowers();
    expect(spy).toHaveBeenCalled()
    expect(component.totalElements).toBe(obj.totalElements);
    component.getPages(obj.totalPages);
    expect(component.arrayPage).toEqual([0,1]);
    expect(component.page).toBe(obj.number);
    expect(component.arrFlower).toEqual(obj.content as any);
    expect(component.objFlower).toEqual(obj)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should getCategory', () => {
    const category = [{category: 'flowers', id: 1}]
    const spy = spyOn(categoryService, 'getCategory').and.returnValue(of(category as any));
    expect(categoryService).toBeTruthy()
    component.getCategory();
    expect(spy).toHaveBeenCalled()
    expect(component.arrCategoryFilter).toEqual(category as any)
  });

  it('should getPages', () => {
    component.getPages(2)
    expect(component.arrayPage).toEqual([0, 1])
  });

  it('should changer', () => {
    const obj = {array: {content: [1, 2, 3]}, totalElement: 1} as any
    component.change(obj);
    expect(component.arrFlower).toEqual([1, 2, 3] as any)
    expect(component.totalElements).toBe(1)
  });

  it('should pageNext', () => {
    component.isPage = true;
    component.pageNext(2)
    expect(component.isPage).toBeFalsy()
    expect(component.page).toBe(2)
  });

  it('should isActivePage', () => {
    component.page = 2
    expect(component.isActivePage(2)).toBe(true)
  });

  it('should selectedSort', () => {
    const flower = {content: [1, 2, 3]} as any
    const spy = spyOn(flowerService, 'sortFlowers').and.returnValue(of(flower));
    component.selectedSort({value: 'igor fedor'});
    expect(spy).toHaveBeenCalledWith('igor', 'fedor')
    expect(component.arrFlower as any).toEqual(flower.content);
    expect(component.disabled).toEqual('igor fedor')
  });

  it('should onEnter', () => {
    const flower = ['igor', 'roze'] as any
    component.search = 'rose';
    const spy = spyOn(flowerService, 'getSearch').and.returnValue(of(flower));
    component.onEnter();
    expect(spy).toHaveBeenCalledWith(component.search)
    expect(component.name).toBe('rose');
    expect(component.arrSearch).toEqual(flower);
    expect(component.arrFlower).toEqual(flower)
    expect(component.totalElements).toBe(flower.length)
  });

  it('should closeSearch', () => {
    component.arrSearch = ['lower', 'state'] as any;
    component.search = 'flower';
    component.closeSearch();
    expect(component.arrSearch).toEqual([]);
    expect(component.search).toBe('')
  });

})

