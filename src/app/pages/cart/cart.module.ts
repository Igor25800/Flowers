import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../module/shared.module";
import {CartComponent} from "./cart.component";
import {CartRoutingModule} from "./cart-routing,module";
import {StripeDialogComponent} from "./stripe-dialog/stripe-dialog.component";



@NgModule({
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule,


  ],
  declarations: [CartComponent, StripeDialogComponent],
  exports: []


})
export class CartModule {
}
