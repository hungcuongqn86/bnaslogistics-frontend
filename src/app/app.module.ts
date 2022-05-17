import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientXsrfModule} from '@angular/common/http';
import {RequestCache, RequestCacheWithMap} from './request-cache.service';

import {AppComponent} from './app.component';
import {AuthService} from './auth.service';
import {FirebaseService} from './firebase.service';
import {HttpErrorHandler} from './http-error-handler.service';
import {LoadingService} from './loading.service';
import {MessagesComponent} from './messages/messages.component';
import {Error404Component} from './messages/error404.component';
import {LoginComponent} from './auth/login.component';
import {ResetComponent} from './auth/reset.component';
import {ResetPasswordComponent} from './auth/reset.password.component';
import {ActiveComponent} from './auth/active.component';
import {RegisterComponent} from './auth/register.component';
import {MessageService} from './message.service';
import {ErrorMessagesService} from './error.messages.service';
import {NgxCaptchaModule} from 'ngx-captcha';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {SharedModule} from './shared.module';
import {OrderService} from './services/order/order.service';

import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';

// Import containers
import {DefaultLayoutComponent} from './layout';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

import {httpInterceptorProviders} from './http-interceptors';
import {routing} from './app.routing.module';
import {AppGuard} from './app.guard.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header',
    }),
    routing,
    AppAsideModule,
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    NgxCaptchaModule,
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    SharedModule.forRoot()
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    MessagesComponent,
    Error404Component,
    LoginComponent,
    RegisterComponent,
    ResetComponent,
    ResetPasswordComponent,
    ActiveComponent
  ],
  providers: [
    AppGuard,
    AuthService,
    FirebaseService,
    HttpErrorHandler,
    LoadingService,
    MessageService,
    ErrorMessagesService,
    OrderService,
    {provide: RequestCache, useClass: RequestCacheWithMap},
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
