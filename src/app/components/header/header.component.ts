import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../shared/services/user/user.service";
import {KeycloakService} from "keycloak-angular";
import {CartService} from "../../shared/services/cart/cart.service";
import {Subject} from "rxjs";
import {switchMap, takeUntil} from "rxjs/operators";
import {ActivatedRoute, NavigationEnd, Router, RouterLinkActive} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  cartArray: Array<any> = [];
  private destroy$ = new Subject()
  progress = 0;
  isDialogToggle = false;
  url!: string
  copyUrl!: string

  constructor(
    private userServices: UserService,
    private keyCloakServices: KeycloakService,
    private cartServices: CartService,
    private router: Router,
  ) {
    this.router.events.subscribe(event =>{
      if(event instanceof NavigationEnd){
        this.isDialogToggle = false;
        const [, url] = event.url.split('/')
        this.copyUrl = url;
        this.url = url;
        this.eventRout(this.url)
      }
    })
  }

  ngOnInit(): void {
    this.getCart();
    this.getCartEvent();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete()
  }

  openDialog(): void {
    this.url = 'modal'
    if(this.isDialogToggle) {
      this.url = this.copyUrl;
      this.eventRout(this.url)
    }
    this.isDialogToggle = !this.isDialogToggle
  }

  eventExitDialog(isEvent: boolean): void {
    this.isDialogToggle = isEvent
    this.url = this.copyUrl;
    this.eventRout(this.url)
  }

  getCartEvent(): void {
    this.cartServices.cartSubject$.pipe(
      switchMap(() =>  {
        return this.cartServices.getCart()
      }),
      takeUntil(this.destroy$),
    ).subscribe(res => {
        this.cartArray = res
    })
  }

  getCart(): void   {
    this.cartServices.getCart().subscribe(cart => {
        this.cartArray = cart
      }
    )
  }

  toggle(): void {
    if (this.progress === 100) {
      this.progress = 0
    } else {
      this.progress = 100;
    }
  }

  close(): void {
    this.progress = 0
  }

  isActivePage(url: string| boolean): boolean {
      return this.url === url
  }

  eventRout(event: string) : void {
    switch (event){
      case 'my-orders':
      case 'registration':
      case 'account':
        this.url = 'modal'
        break
    }
  }
}





