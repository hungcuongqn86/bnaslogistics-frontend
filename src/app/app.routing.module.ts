import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppGuard} from './app.guard.service';
import {Error404Component} from './messages/error404.component';
import {LoginComponent} from './auth/login.component';
import {RegisterComponent} from './auth/register.component';
import {DefaultLayoutComponent} from './layout';
import {ResetPasswordComponent} from './auth/reset.password.component';
import {ResetComponent} from './auth/reset.component';
import {ActiveComponent} from './auth/active.component';

const appRoutes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: ''
    },
    children: [
      {
        path: '',
        loadChildren: './modules/dashboard/dashboard.module#DashboardModule',
        data: {
          title: 'Bảng điều khiển'
        }
      },
      {
        path: 'dashboard',
        loadChildren: './modules/dashboard/dashboard.module#DashboardModule',
        data: {
          title: 'Bảng điều khiển'
        }
      },
      {
        path: 'home',
        loadChildren: './modules/dashboard/dashboard.module#DashboardModule',
        data: {
          title: 'Bảng điều khiển'
        }
      },
      {
        path: 'notification',
        loadChildren: './modules/notification/notification.module#NotificationModule',
        data: {
          title: 'Thông báo'
        }
      }
      , {
        path: 'mpartner',
        loadChildren: './modules/mpartner/mpartner.module#MpartnerModule',
        data: {
          title: 'Đối tác'
        }
      }
      , {
        path: 'muser',
        loadChildren: './modules/muser/muser.module#MuserModule',
        data: {
          title: 'Người dùng'
        }
      }, {
        path: 'mshop',
        loadChildren: './modules/mshop/mshop.module#MshopModule',
        data: {
          title: 'Nhà cung cấp'
        }
      }, {
        path: 'account',
        loadChildren: './modules/account/account.module#AccountModule',
        data: {
          title: 'Tài khoản'
        }
      }
      , {
        path: 'mcustumer',
        loadChildren: './modules/mcustumer/mcustumer.module#McustumerModule',
        data: {
          title: 'Khách hàng'
        }
      }
      , {
        path: 'cart',
        loadChildren: './modules/cart/cart.module#CartModule',
        data: {
          title: 'Giỏ hàng'
        }
      }, {
        path: 'shipping',
        loadChildren: './modules/shipping/shipping.module#ShippingModule',
        data: {
          title: 'Yêu cầu ký gửi'
        }
      }
      , {
        path: 'order',
        loadChildren: './modules/order/order.module#OrderModule',
        data: {
          title: 'Đơn hàng'
        }
      }, {
        path: 'complain',
        loadChildren: './modules/complain/complain.module#ComplainModule',
        data: {
          title: 'Khiếu nại'
        }
      }, {
        path: 'package',
        loadChildren: './modules/package/package.module#PackageModule',
        data: {
          title: 'Kiện hàng'
        }
      }, {
        path: 'mypackage',
        loadChildren: './modules/mypackage/mypackage.module#MypackageModule',
        data: {
          title: 'Kiện hàng'
        }
      }, {
        path: 'warehouse',
        loadChildren: './modules/warehouse/warehouse.module#WarehouseModule',
        data: {
          title: 'Kho Việt Nam'
        }
      }, {
        path: 'warehouse-tq',
        loadChildren: './modules/warehousetq/warehousetq.module#WarehousetqModule',
        data: {
          title: 'Kho Trung Quốc'
        }
      }
      , {
        path: 'wallet',
        loadChildren: './modules/wallet/wallet.module#WalletModule',
        data: {
          title: 'Ví điện tử'
        }
      }
      , {
        path: 'setting',
        loadChildren: './modules/setting/setting.module#SettingModule',
        data: {
          title: 'Cấu hình hệ thống'
        }
      }
    ],
    canActivate: [AppGuard]
  },
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {path: 'register', component: RegisterComponent, pathMatch: 'full'},
  {path: 'reset', component: ResetComponent, pathMatch: 'full'},
  {path: 'reset-password/:token', component: ResetPasswordComponent, pathMatch: 'full'},
  {path: 'activate-account/:token', component: ActiveComponent, pathMatch: 'full'},
  {
    path: 'website', loadChildren: () => new Promise(() => {
      window.open('https://nguonhang.net/');
    }), pathMatch: 'full'
  },
  {path: '**', component: Error404Component, pathMatch: 'full'}
];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
