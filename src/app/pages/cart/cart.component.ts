import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CartService} from "../../shared/services/cart/cart.service";
import {FlowersService} from "../../shared/services/flowers/flowers.service";
import {IFlowerBack} from "../../shared/interfaces/flowers-back.interface";
import {ICartItem} from "../../shared/interfaces/cart.interface";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {OrderService} from "../../shared/services/order/order.service";
import {environment} from "../../../environments/environment";
import {map, switchMap, tap} from "rxjs/operators";
import {forkJoin} from "rxjs";
import {Address} from "ngx-google-places-autocomplete/objects/address";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {StripeDialogComponent} from "./stripe-dialog/stripe-dialog.component";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-cart',
  templateUrl: 'cart.component.html',
  styleUrls: ['cart.component.scss']
})

export class CartComponent implements OnInit {

  cartArray: any = [];
  orderArray: Array<ICartItem> = [];
  total = 0;
  selectedItemId!: number;
  orderForm!: FormGroup;
  submitted!: boolean;
  position =  {lat: 53.90650967012304, lng: 27.52991802527217};
  location = true;
  height = '396px';
  options!: any;
  pipe = new DatePipe('en-US')
  @ViewChild('addressInput') addressInput!: ElementRef;


  constructor(
    private cartService: CartService,
    private flowerService: FlowersService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private orderService: OrderService,
    private router: Router,
    public dialog: MatDialog
  ) {}

   ngOnInit(): void {
    this.getForm();
    this.getCart();
  }

  getForm(): void {
    this.orderForm = this.fb.group({
      deliveryName: ['', [Validators.required, Validators.pattern('[a-zA-Z]{1,10} [a-zA-Z]{1,10}')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      message: [''],
      information: [''],
      deliveryAddress: ['', [Validators.required]],
      radio: ['', Validators.required]
    })
  }

  getCart(): void {
    this.cartService.getCart().pipe(
      tap(response => this.orderArray = response),
      switchMap(cart =>  {
        const itemRequests = cart.map(item =>  this.flowerService.detailsFlowers(item.itemId).pipe(
          map(flower => {
            return ({... flower, count: item.quantity})
          })
        ))
          return forkJoin(itemRequests)
      }),
    ).subscribe(array => {
      this.cartArray = array;
      this.calcAllTotalPrice();
    })
  }

  calcPrice(): void {
    this.calcAllTotalPrice();
  }

  get url(): string {
    return environment.img
  }

  calcTotalPrice(price: string, count: number ): number {
    if (price && count) {
      const result = +price * count;
      return +result.toFixed(2);
    }
    return 0
  }

  calcAllTotalPrice(): void {
    this.total = +this.cartArray?.reduce((totals: number, cart: IFlowerBack) => {
      if (cart.count) {
        const result = totals + (+cart.priceDto.price * cart.count)
        return result;
      } else {
        return 0;
      }
    }, 0).toFixed(2);
  }

  deleteCart(id: number): void {
    const item = this.orderArray.find(el => el.itemId === id)
    if (item) {
      this.cartService.deleteCartItem(item.id).subscribe(() => {
        this.cartArray = [];
        this.getCart();
        this.cartService.cartSubject$.next();
      })
    } else {
      this.toaster.error('no product')
    }
  }

  selectItem(id: number): void {
    this.selectedItemId = id;
  }

  addOrder(): void {
    this.submitted = true;
    if(this.orderForm.valid) {
      const {deliveryName, deliveryAddress, email, phone, radio} = this.orderForm.value;
      const now = Date.now();
      const myFormattedDate = this.pipe.transform(now, 'yyyy-MM-dd HH:mm');
      const order = {deliveryName, deliveryAddress, email, phone, productItems: this.orderArray, paymentType: radio, deliveryTime: myFormattedDate}
      this.orderService.addOrder(order).subscribe(res => {
        if(radio === 'ONLINE') {
          this.openDialog(res)
        }
        this.orderForm.reset();
        this.cartArray = [];
        this.cartService.cartSubject$.next();
        this.submitted = false;
        this.toaster.success('add Order')
      })
    } else  {
      this.toaster.error('form inValid')
    }
  }

  validatorControl(name: string): FormControl {
    return this.orderForm.get(name) as FormControl;
  }

  validatorForm(name: string): Validators {
    return (this.validatorControl(name).invalid) && (this.validatorControl(name).dirty || (this.validatorControl(name).touched || this.submitted));
  }

  public handleAddressChange(address: Address) {
    this.orderForm.patchValue({deliveryAddress: this.addressInput.nativeElement.value});
    this.position  = {lat: address.geometry.location.lat(), lng: address.geometry.location.lng()}
  }

  eventMaps(maps: any): void {
    const [one] = maps.results;
    this.orderForm.patchValue({deliveryAddress: one.formatted_address})
  }

  continueShopping(): void {
    this.router.navigate(['catalog'])
  }

  openDialog(obj: any): void {
    const dialogRef = this.dialog.open(StripeDialogComponent, {
      width: '536px',
      height: '497',
      data: {obj: obj, totalPrice: this.total},
      backdropClass: 'dialog-bg-trans',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
