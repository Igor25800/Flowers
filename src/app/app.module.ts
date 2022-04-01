import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {HomeComponent} from './pages/home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./module/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {initializeKeycloak} from "./until/app.init";
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {CustomHttpInterceptor} from "./shared/intercepts/custom-http-interceptor.service";
import { ChatComponent } from './components/chat/chat.component';
import {StompService} from "./shared/services/stomp/stomp.service";
import { DialogComponent } from './components/dialog/dialog.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ChatComponent,
    DialogComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    KeycloakAngularModule,
  ],

  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    },
    StompService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
