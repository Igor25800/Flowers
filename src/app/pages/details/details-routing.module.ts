import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DetailsComponent} from "./details.component";


const routes: Routes = [
  {
    path: '',
    component: DetailsComponent
  },
  {
    path: 'price-change',
    loadChildren: () => import('./price-changes/price-changes.module').then(m => m.PriceChangesModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class DetailsRoutingModule {
}
