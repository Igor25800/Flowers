import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../module/shared.module";
import {AccountComponent} from "./account.component";
import {AccountRoutingModule} from "./account-routing.module";
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule

  ],
  declarations: [AccountComponent, ChangePasswordComponent],


})
export class AccountModule {
}
