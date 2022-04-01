import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../module/shared.module";
import {SearchComponent} from "./search.component";
import {SearchRoutingModule} from "./search-routing.module";




@NgModule({
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedModule,


  ],
  declarations: [SearchComponent],


})
export class SearchModule {
}
