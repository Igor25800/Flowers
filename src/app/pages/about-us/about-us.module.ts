import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../module/shared.module";
import {AboutUsComponent} from "./about-us.component";
import {AboutUsRoutingModule} from "./about-us-routing.module";


@NgModule({
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    SharedModule
  ],
  declarations: [AboutUsComponent],


})
export class AboutUsModule {
}
