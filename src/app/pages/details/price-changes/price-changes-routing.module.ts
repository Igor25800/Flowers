import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PriceChangesComponent} from "./price-changes.component";


const routes: Routes = [
  {
    path: '',
    component: PriceChangesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class PriceChangesRoutingModule {
}
