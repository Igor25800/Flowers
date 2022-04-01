import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../module/shared.module";
import {CatalogComponent} from "./catalog.component";
import {CatalogRoutingModule} from "./catalog-routing-module";


@NgModule({
  imports: [
    CommonModule,
    CatalogRoutingModule,
    SharedModule,
  ],
  declarations: [CatalogComponent],
  exports: []


})
export class CatalogModule {
}
