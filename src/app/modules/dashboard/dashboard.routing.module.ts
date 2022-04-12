import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard.component';
import {HomeComponent} from './home.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule]
})

export class DashboardRoutingModule {
  constructor() {
  }
}
