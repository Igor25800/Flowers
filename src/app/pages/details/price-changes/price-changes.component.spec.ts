import {ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {PriceChangesComponent} from "./price-changes.component";
import {PriceService} from "../../../shared/services/price/price.service";
import {of} from "rxjs";


fdescribe('PriceChangesComponent', () => {
  let component: PriceChangesComponent;
  let fixture: ComponentFixture<PriceChangesComponent>;
  let service: PriceService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PriceChangesComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, RouterTestingModule],
      providers: [PriceService]
    })
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceChangesComponent);
    component = fixture.componentInstance;
    service = TestBed.get(PriceService);
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should getPrice',  () => {
    const price = [{
      date: "2021-08-10 14:10",
      id: 1050,
      itemId: 1050,
      price: 80.99,
    },
      {
        date: "2021-09-11 14:10",
        id: 1050,
        itemId: 1050,
        price: 89.99,
      }
    ] as any
   const spy = spyOn(service, 'getPrice').and.returnValue(of(price));
    component.getPrice();
    expect(spy).toHaveBeenCalled();
    expect(component.arrayPrice).toEqual([80.99, 89.99]);
    expect(component.arrayDate).toEqual(['10.08', '11.09']);
  });

  it('should toggleMonths true',  () => {
     component.arrayDate = ['10.08', '10.08'];
     component.toggleMonths();
     expect(component.isActiveMoon).toBe(true)
  });
  //
  it('should toggleMonths false',  () => {
    component.arrayDate = ['10.09', '10.08'];
    component.toggleMonths();
    expect(component.isActiveMoon).toBe(false)
  });

})

