import {Component, OnInit} from '@angular/core';
import {FlowersService} from "../../shared/services/flowers/flowers.service";
import {ICategoryBack} from "../../shared/interfaces/category-back.interface";
import {IFlowerBack} from "../../shared/interfaces/flowers-back.interface";
import {Router} from "@angular/router";
import {IFlowersStandard} from "../../shared/interfaces/flowersStandard.interface";
import {CategoryService} from "../../shared/services/category/category.service";
import {CartService} from "../../shared/services/cart/cart.service";
import {ICartItem} from "../../shared/interfaces/cart.interface";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environments/environment";


@Component({
  selector: 'app-catalog',
  templateUrl: 'catalog.component.html',
  styleUrls: ['catalog.component.scss']
})

export class CatalogComponent implements OnInit {
  arrCategoryFilter: Array<ICategoryBack> = [];
  objFlower: any;
  arrFlower: Array<IFlowerBack> = [];
  arrayPage: Array<number> = [];
  cartArray: Array<ICartItem> = [];
  page = 0;
  totalPages!: number;
  isPage = true;
  totalElements!: number;
  disabled!: string;
  arraySort: Array<string> = [];

  constructor(
    private flowersServices: FlowersService,
    private router: Router,
    private categoryServices: CategoryService,
    private cartServices: CartService,
    private toaster: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.getFlowers();
    this.getCategory();
    this.getCart();
  }

  getCart(): void {
    this.cartServices.getCart().subscribe(cart => {
      this.cartArray = cart
    }, error => {
      const cart = {
        orderItems: [],
        text: ''
      }
      this.cartServices.createCart(cart).subscribe()
    })
  }

  getCategory(): void {
    this.categoryServices.getCategory().subscribe(category => {
      this.arrCategoryFilter = category;
    })
  }

  getPages(totalPages: number): void {
    this.arrayPage = [];
    for (let i = 0; i <= totalPages - 1; i++) {
      this.arrayPage.push(i);
    }
  }

  change({array, totalElement}: { array: any, totalElement: number }): void {
    this.arrFlower = array.content
    this.totalElements = totalElement
  }

  getFlowers(): void {
    this.flowersServices.getFLowers(this.page).subscribe((flower: IFlowersStandard) => {
      this.totalElements = flower.totalElements;
      if (this.isPage) {
        this.getPages(flower.totalPages);
      }
      this.page = flower.number;
      this.arrFlower = flower.content;
      this.objFlower = flower;
    })
  }

  get url(): string {
    return environment.img
  }

  pageNext(page: number): void {
    this.isPage = false;
    this.page = page;
  }

  activePage(page: number): boolean {
    return this.page === page;
  }

  urlFlower({id, name}: IFlowerBack): void {
    const flowers = name.replace(/ /g, '-').toLowerCase()
    this.router.navigate([`catalog/${flowers}/${id}`])
  }

  selectedCatalog({id}: ICategoryBack): void {
    this.categoryServices.filterCategory(+id).subscribe((res: any) => {
      this.arrFlower = res.content;
      this.getPages(res.totalPages);
      this.totalElements = res.totalElements;
    })
  }

  selected(value: any): void {
    this.arraySort = value.value.split(' ')
  }

  cart(flower: IFlowerBack): void {
    const cartItem = {
      itemId: flower.id,
      priceId: flower.priceDto.id,
      quantity: 1,
    }
    if (this.cartArray.some(cart => cart.itemId === flower.id)) {
      const index = this.cartArray.findIndex(cart => cart.itemId === flower.id )
      this.cartArray[index].quantity += 1
      const cart = {
        orderItems: this.cartArray
      }
      this.cartServices.editCart(cart).subscribe(() => {
        this.toaster.success('add count Flowers')
      })} else {
      this.cartServices.addCart(cartItem).subscribe(() => {
        this.cartServices.cartSubject$.next()
        this.getCart();
        this.toaster.success('add flowers')
      })
    }
  }

  clearArray(): void {
    const cart = {
      orderItems: [],
      text: ''
    }
    this.cartServices.createCart(cart).subscribe(res => {
    })
  }
}
