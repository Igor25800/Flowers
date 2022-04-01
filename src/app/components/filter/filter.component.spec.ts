import {ComponentFixture, TestBed} from "@angular/core/testing";
import {FlowersService} from "../../shared/services/flowers/flowers.service";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FilterComponent} from "./filter.component";
import {of} from "rxjs";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../module/shared.module";



fdescribe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let service: FlowersService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule, SharedModule],
      providers: [FlowersService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    service = TestBed.get(FlowersService);
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should setForm', () => {
    component.ngOnInit();
    component.setForm();
    component.formGroupRadio.patchValue({
      min: 0,
      max: 1000
    }, {emitEvent: false})

    expect(component.formGroupRadio.value.max).toBe(1000);
  });

  it('should filterEvent', () => {
    component.progress = false;
    component.selectedSort = false
    component.filterEvent();
    expect(component.progress).toBe(true);
    expect(component.selectedSort).toBe(true);
  });

  it('should close', () => {
    component.progress = true
    component.close();
    expect(component.progress).toBe(false)
  });

  it('should sortingEvent', () => {
    component.progress = false;
    component.selectedSort = true
    component.sortingEvent()
    expect(component.progress).toBe(true);
    expect(component.selectedSort).toBe(false);
  });

  it('should selectedCheckbox', () => {
    const name = {name: 'igor', id: '1', description: '', photo: '', thumbnail: ''};
    component.selectedCheckbox(name);
    expect(component.checked).toBe('igor');
    expect(component.categoryId).toBe(+'1')
  })


  it('should filter', () => {
    const obj = {array: [1, 2, 3], totalElement: 3}
    const spy = spyOn(service, 'filterFlowers').and.returnValue(of(obj as any));
    component.progress = true;
    component.filter();
    expect(spy).toHaveBeenCalled();
    expect(service).toBeTruthy()
    component.arrayFlowers.subscribe(array => {
      expect(array).toEqual(obj.array)
    })
    component.getPages.subscribe(page => {
      expect(page).toBe(obj.totalElement)
    })
    expect(component.progress).toBeFalsy()
  });

  it('should clearFilter', () => {
    component.objFlower = {array: [1, 2, 3], totalElement: 3} as any
    component.checked = 'igor'
    component.formGroupRadio.patchValue({rangeValues: [100, 200]})
    component.clearFilter();
    component.arrayFlowers.subscribe(res => {
      expect(res).toEqual(component.objFlower)
    })
    expect(component.checked).toBe('')
    expect(component.formGroupRadio.value.rangeValues).toEqual([0, 1000])
  });

  it('should sorting', () => {
    component.formGroupRadio.patchValue({radio: 1})
    component.sorting();
    component.selected.subscribe(formRadio => {
      expect(formRadio).toEqual(component.formGroupRadio.value.radio)
    })
  });

})

