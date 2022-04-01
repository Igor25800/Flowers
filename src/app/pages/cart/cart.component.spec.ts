import {ComponentFixture, TestBed, tick} from "@angular/core/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {CartComponent} from "./cart.component";
import {CartService} from "../../shared/services/cart/cart.service";
import {FlowersService} from "../../shared/services/flowers/flowers.service";
import {OrderService} from "../../shared/services/order/order.service";
import {of} from "rxjs";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


fdescribe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let service: OrderService;
  let cartService: CartService;
  let flowerService: FlowersService;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, ToastrModule.forRoot(), FormsModule, RouterTestingModule, MatDialogModule, BrowserAnimationsModule],
      providers: [FlowersService, ToastrService, CartService, OrderService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    service = TestBed.get(OrderService);
    cartService = TestBed.get(CartService);
    flowerService = TestBed.get(FlowersService);
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should test getForms', () => {
    component.getForm();
    expect(component.orderForm.value).toEqual({deliveryName: '', email: '', phone: '', message: '', information: '', deliveryAddress: '', radio: ''})
  });

  it('should set submitted to true', () => {
    component.addOrder();
    expect(component.submitted).toBe(true)
  });

  it('should getForm', () => {
    component.getForm()
    expect(component.orderForm.value).toEqual({
      deliveryName: '',
      email: '',
      phone: '',
      message: '',
      information: '',
      deliveryAddress: '',
      radio: ''
    })
  });

  it('should calcAllTotalPrice', () => {
    component.cartArray = [{count: 2, priceDto: {price: 100}}, {count: 2, priceDto: {price: 100}}]
    component.calcAllTotalPrice();
    expect(component.total).toBe(400)
  });

  it('should calcTotalPrice ', () => {
    expect(component.calcTotalPrice('200', 2)).toBe(400)
  });

  it('should selectItem', () => {
    component.selectedItemId = 0
    component.selectItem(1)
    expect(component.selectedItemId).toBe(1)
  });

  it('should getCart', () => {
    const category = [{id: 212, itemId: 1050, priceId: 1071, quantity: 1}]
    const spyCart = spyOn(cartService, 'getCart').and.returnValue(of(category));
    const obj = {id: 1050, name: "PRIDE BOUQUET", photo: "flower-9-photo", priceDto: {price: 100}}
    const spyFlowers = spyOn(flowerService, 'detailsFlowers').and.returnValue(of(obj as any))
    const result = [{count: 1, id: 1050, name: "PRIDE BOUQUET", photo: "flower-9-photo", priceDto: {price: 100}}]
    component.getCart();
    expect(spyCart).toHaveBeenCalledWith()
    expect(spyFlowers).toHaveBeenCalledWith(1050)
    expect(component.orderArray).toEqual(category);
    expect(component.cartArray).toEqual(result);
    component.cartArray = result
    component.calcAllTotalPrice()
    expect(component.total).toBe(100)

  });

  it('should submitted', () => {
    component.submitted = false;
    component.addOrder();
    expect(component.submitted).toBeTruthy()
  });

  it('should validatorForm', () => {
    component.orderForm.patchValue({deliveryName: 'igor fedor'})
    component.validatorForm('deliveryName')
    expect(component.orderForm.controls.deliveryName.status).toBe('VALID')
  });

  it('should handleAddressChangeCart', () => {
    const obj = {
      geometry: {
        location: {
          lat: function lat() {
            return 123333
          },
          lng: function lng() {
            return 2222
          }
        }
      }
    } as any;
    component.handleAddressChange(obj);
    expect(component.position).toEqual({lat: 123333, lng: 2222})
  });

  it('should eventMapsCart', () => {
    const array = {results: [{formatted_address: 'lvov'}, {formatted_address: 'kiev'}]};
    component.eventMaps(array);
    expect(component.orderForm.value.deliveryAddress).toBe('lvov')
  });

})

