import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppGuard} from './app.guard.service';
import {Error404Component} from './messages/error404.component';
import {LoginComponent} from './auth/login.component';
import {RegisterComponent} from './auth/register.component';
import {DefaultLayoutComponent} from './layout';
import {SettingModule} from './modules/setting/setting.module';

const appRoutes: Routes = [
    {
        path: '',
        component: DefaultLayoutComponent,
        data: {
            title: 'Quản lý đơn hàng'
        },
        children: [
            {
                path: 'dashboard',
                loadChildren: './modules/dashboard/dashboard.module#DashboardModule',
                data: {
                    title: 'Bảng điều khiển'
                },
                canActivate: [AppGuard]
            },
            {
                path: 'notification',
                loadChildren: './modules/notification/notification.module#NotificationModule',
                data: {
                    title: 'Thông báo'
                },
                canActivate: [AppGuard]
            }
            , {
                path: 'mpartner',
                loadChildren: './modules/mpartner/mpartner.module#MpartnerModule',
                data: {
                    title: 'Đối tác'
                },
                canActivate: [AppGuard]
            }
            , {
                path: 'muser',
                loadChildren: './modules/muser/muser.module#MuserModule',
                data: {
                    title: 'Người dùng'
                },
                canActivate: [AppGuard]
            }, {
                path: 'account',
                loadChildren: './modules/account/account.module#AccountModule',
                data: {
                    title: 'Tài khoản'
                },
                canActivate: [AppGuard]
            }
            , {
                path: 'mcustumer',
                loadChildren: './modules/mcustumer/mcustumer.module#McustumerModule',
                data: {
                    title: 'Khách hàng'
                },
                canActivate: [AppGuard]
            }
            , {
                path: 'cart',
                loadChildren: './modules/cart/cart.module#CartModule',
                data: {
                    title: 'Giỏ hàng'
                },
                canActivate: [AppGuard]
          }, {
            path: 'shipping',
              loadChildren: './modules/shipping/shipping.module#ShippingModule',
            data: {
              title: 'Yêu cầu ký gửi'
            },
            canActivate: [AppGuard]
          }
            , {
                path: 'order',
                loadChildren: './modules/order/order.module#OrderModule',
                data: {
                    title: 'Đơn hàng'
                },
                canActivate: [AppGuard]
            }, {
                path: 'complain',
                loadChildren: './modules/complain/complain.module#ComplainModule',
                data: {
                    title: 'Khiếu nại'
                },
                canActivate: [AppGuard]
            }, {
                path: 'package',
                loadChildren: './modules/package/package.module#PackageModule',
                data: {
                    title: 'Kiện hàng'
                },
                canActivate: [AppGuard]
            }, {
                path: 'mypackage',
                loadChildren: './modules/mypackage/mypackage.module#MypackageModule',
                data: {
                    title: 'Kiện hàng'
                },
                canActivate: [AppGuard]
            }, {
                path: 'warehouse',
                loadChildren: './modules/warehouse/warehouse.module#WarehouseModule',
                data: {
                    title: 'Kho Việt Nam'
                },
                canActivate: [AppGuard]
            }
            , {
                path: 'wallet',
                loadChildren: './modules/wallet/wallet.module#WalletModule',
                data: {
                    title: 'Ví điện tử'
                },
                canActivate: [AppGuard]
            }
            , {
                path: 'setting',
                loadChildren: './modules/setting/setting.module#SettingModule',
                data: {
                    title: 'Cấu hình hệ thống'
                },
                canActivate: [AppGuard]
            }
        ],
        canActivate: [AppGuard]
    },
    {path: 'login', component: LoginComponent, pathMatch: 'full'},
    {path: 'register', component: RegisterComponent, pathMatch: 'full'},
    {path: '**', component: Error404Component, pathMatch: 'full'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
