import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../module/shared.module";
import {DetailsRoutingModule} from "./details-routing.module";
import {DetailsComponent} from "./details.component";


@NgModule({
  imports: [
    CommonModule,
    DetailsRoutingModule,
    SharedModule
  ],
  declarations: [DetailsComponent],


})
export class DetailsModule {
}
