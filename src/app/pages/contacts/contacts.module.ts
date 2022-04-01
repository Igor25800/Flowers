import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactsComponent} from "./contacts.component";
import {ContactsRoutingModule} from "./contacts-routing.module";
import {SharedModule} from "../../module/shared.module";


@NgModule({
  imports: [
    CommonModule,
    ContactsRoutingModule,
    SharedModule,
  ],
  declarations: [ContactsComponent],


})
export class ContactsModule {
}
