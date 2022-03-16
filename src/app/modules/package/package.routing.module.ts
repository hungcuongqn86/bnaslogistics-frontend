import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PackageComponent} from './package.component';
import {PackageDetailComponent} from './package.detail.component';

const routes: Routes = [
  {
    path: '', component: PackageComponent,
    data: {
      title: 'Kiện hàng'
    }
  },
  {
    path: 'detail/:id', component: PackageDetailComponent,
    data: {
      title: 'Chi tiết kiện hàng'
    }
  }, {
    path: ':package_code', component: PackageComponent,
    data: {
      title: 'Kiện hàng'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule]
})

export class PackageRoutingModule {
  constructor() {
  }
}
