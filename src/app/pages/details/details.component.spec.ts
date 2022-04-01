import {ComponentFixture, TestBed} from "@angular/core/testing";
import {DetailsComponent} from "./details.component";
import {FlowersService} from "../../shared/services/flowers/flowers.service";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {of} from "rxjs";
import {environment} from "../../../environments/environment";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";


fdescribe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let service: FlowersService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [FlowersService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    service = TestBed.get(FlowersService);
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should getDetails', () => {
    const details = [{id: 1050, name: 2}] as any
    const spy = spyOn(service, 'detailsFlowers').and.returnValue(of(details));
    component.getDetails();
    expect(spy).toHaveBeenCalled()
    expect(component.obj).toEqual(details)
  });

  it('should url true',  () => {
    component.obj = {id: 1, name: 2, phone: 'flower'} as any
    expect(component.url).toBe(`${environment.img}${component.obj.photo}`)
  });

  it('should url false',  () => {
    component.obj = null as any
    expect(component.url).toBe('');
  });

})

