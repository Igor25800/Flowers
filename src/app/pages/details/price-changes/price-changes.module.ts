import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../../module/shared.module";
import {PriceChangesComponent} from "./price-changes.component";
import {PriceChangesRoutingModule} from "./price-changes-routing.module";





@NgModule({
  imports: [
    CommonModule,
    PriceChangesRoutingModule,
    SharedModule,
  ],
  declarations: [PriceChangesComponent],


})
export class PriceChangesModule {
}
