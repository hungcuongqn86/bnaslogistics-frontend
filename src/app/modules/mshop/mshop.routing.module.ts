import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MyshopComponent} from './myshop/myshop.component';
import {MyshopDetailComponent} from './myshop/myshop.detail.component';

const routes: Routes = [
  {
    path: 'myshop', component: MyshopComponent,
    data: {
      title: 'Nhà cung cấp'
    }
  },
  {
    path: 'myshop/edit/:id', component: MyshopDetailComponent,
    data: {
      title: 'Sửa nhà cung cấp'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule]
})

export class MshopRoutingModule {
  constructor() {
  }
}
