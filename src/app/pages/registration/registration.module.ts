import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../module/shared.module";
import {RegistrationComponent} from "./registration.component";
import {ModalResetPasswordComponent} from "./modalResetPassword/modal-reset-password.component";
import {RegistrationRoutingModule} from "./registration-routing.module";


@NgModule({
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    SharedModule,
  ],
  declarations: [RegistrationComponent, ModalResetPasswordComponent],


})
export class RegistrationModule {
}
