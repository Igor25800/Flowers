import {ComponentFixture, TestBed} from "@angular/core/testing";
import {MyOrdersComponent} from "./my-orders.component";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FlowersService} from "../../shared/services/flowers/flowers.service";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {of} from "rxjs";
import {OrderService} from "../../shared/services/order/order.service";


fdescribe('MyOrdersComponent', () => {
  let component: MyOrdersComponent;
  let fixture: ComponentFixture<MyOrdersComponent>;
  let service: FlowersService;
  let orderServices: OrderService


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyOrdersComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [FlowersService, OrderService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOrdersComponent);
    component = fixture.componentInstance;
    service = TestBed.get(FlowersService);
    orderServices = TestBed.get(OrderService);
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should isActiveImg true', () => {
    component.panelOpenState = 1
    component.isActiveImg()
    expect(component.urlImg).toBe('../../assets/img/top.png')
  });

  it('should isActiveImg false', () => {
    component.isActiveImg()
    expect(component.urlImg).toBe('../../assets/img/bottom.png')
  });

  it('should calcAllTotalPrice', () => {
    const array = [{count: 2, priceDto: {price: 100}}, {count: 2, priceDto: {price: 100}}] as any
    expect(component.calcAllTotalPrice(array)).toBe(400)
  });

  it('should isStatus', () =>  {
      expect(component.isStatus('PENDING_PAYMENT')).toBe('warning')
  });

  it('should getOrder',  () => {
    const order = [{creationDate: "2021-12-17 15:18",
      deliveryAddress: "lvo",
      deliveryName: "ifor fedore",
      deliveryTime: "2022-01-01 14:20",
      email: "igo@mailry",
      id: 1,
      orderStatus: "DELIVERY",
      paymentType: "CASH",
      phone: "222222222222",
      productItems: [
        {
          id: 1,
          itemId: 1051,
          priceId: 1051,
          quantity: 1
        }
      ]
    }] as any
    const spyCart = spyOn(orderServices, 'getOrder').and.returnValue(of(order));
    component.getOrder();
    expect(spyCart).toHaveBeenCalledWith()
    expect(component.arrayOrders).toEqual(order)
  });

})

