import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigateComponent} from "../components/navigate/navigate.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {NgxMaskModule} from "ngx-mask";
import {TemplateComponent} from "../components/template/template.component";
import {RouterModule} from "@angular/router";
import {MatDialogModule} from '@angular/material/dialog';
import {SliderModule} from 'primeng/slider';
import {MoneyPipe} from "../shared/pipes/money/money.pipe";
import {FilterComponent} from "../components/filter/filter.component";
import {ChartModule} from "primeng/chart";
import {MapsComponent} from "../components/maps/maps.component";
import {GooglePlaceModule} from "ngx-google-places-autocomplete";
import {MatExpansionModule} from '@angular/material/expansion';
import {CdkAccordionModule} from '@angular/cdk/accordion';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      progressBar: true
    }),
    NgxMaskModule.forRoot(),
    RouterModule,
    FormsModule,
    MatDialogModule,
    SliderModule,
    ChartModule,
    GooglePlaceModule,
    MatExpansionModule,
    CdkAccordionModule
  ],

  declarations: [NavigateComponent, TemplateComponent, MoneyPipe, FilterComponent, MapsComponent],
  exports: [NavigateComponent, ReactiveFormsModule, NgxMaskModule, TemplateComponent, MatDialogModule, FormsModule,SliderModule, MoneyPipe, FilterComponent, ChartModule, MapsComponent, GooglePlaceModule, MatExpansionModule, CdkAccordionModule]


})
export class SharedModule {
}
