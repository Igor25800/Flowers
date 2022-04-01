import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../module/shared.module";
import {MyOrdersComponent} from "./my-orders.component";
import {MyOrdersRoutingModule} from "./my-orders.routing.module";


@NgModule({
  imports: [
    CommonModule,
    MyOrdersRoutingModule,
    SharedModule

  ],
  declarations: [MyOrdersComponent],


})
export class MyOrdersModule {
}
