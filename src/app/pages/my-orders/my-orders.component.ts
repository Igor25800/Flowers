import {Component, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {environment} from "../../../environments/environment";
import {OrderService} from "../../shared/services/order/order.service";
import {IOrder} from "../../shared/interfaces/order.interfaces";
import {FlowersService} from "../../shared/services/flowers/flowers.service";
import { switchMap, tap} from "rxjs/operators";
import {forkJoin} from "rxjs";
import {IFlowerBack} from "../../shared/interfaces/flowers-back.interface";


@Component({
  selector: 'app-my-orders',
  templateUrl: 'my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate(300, style({opacity: 1}))
      ]),
      transition(':leave', [
        animate(300, style({opacity: 0}))
      ])
    ])
  ]
})

export class MyOrdersComponent implements OnInit {
  panelOpenState!: number;
  urlImg!: string;
  order!: string;
  arrayOrders: Array<IOrder> = [];
  orderItems: any = [];
  arrayOrder: Array<IOrder> = [];

  constructor(
    private orderService: OrderService,
    private flowerService: FlowersService,
  ) {
  }

  ngOnInit(): void {
    this.isActiveImg();
    this.getOrder();
  }

  getOrder(): void {
    this.orderService.getOrder().pipe(
      tap((orders: Array<IOrder>) => {
        this.arrayOrders = orders;
      }),
      switchMap((productItems) => {
        this.orderItems = this.arrayOrders.map((order: IOrder) => order.productItems.map((name) => this.flowerService.detailsFlowers(name.itemId)))
        return forkJoin(this.orderItems.flat())
      })
    ).subscribe((array: any) => {
      const name = this.arrayOrders.map((order: IOrder) => {
        return {
          ...order, productItems: order.productItems.map((name) => {
            const obj = array.find((el: any) => el.id === name.itemId)
            return {...obj, count: name.quantity}
          })
        }
      })
      this.arrayOrder = name;
    })
  }

  isActiveImg(): void {
    if (this.panelOpenState) {
      this.urlImg = '../../assets/img/top.png'
    } else {
      this.urlImg = '../../assets/img/bottom.png'
    }
  }

  get url(): string {
    return environment.img
  }

  calcTotalPrice(price: string, count: number): number {
    if (price && count) {
      const result = +price * count;
      return +result.toFixed(2);
    }
    return 0
  }

  calcAllTotalPrice(array: Array<IFlowerBack>): number {
    const name = array?.reduce((totals: number, cart: any) => {
      if (cart.count) {
        const result = totals + (+cart.priceDto.price * cart.count)
        return result;
      } else {
        return 0;
      }
    }, 0).toFixed(2);
    return +name
  }

  isStatus(status: string | undefined): string {
      if(status === 'PENDING_PAYMENT') {
        return  'warning'
      } else {
        return  'green'
      }
  }
}
