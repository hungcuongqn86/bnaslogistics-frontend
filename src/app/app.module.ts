import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientXsrfModule} from '@angular/common/http';

import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';

import {RequestCache, RequestCacheWithMap} from './request-cache.service';

import {AppComponent} from './app.component';
import {AuthService} from './auth.service';
import { FirebaseService} from './firebase.service';
import {HttpErrorHandler} from './http-error-handler.service';
import {LoadingService} from './loading.service';
import {MessagesComponent} from './messages/messages.component';
import {Error404Component} from './messages/error404.component';
import {LoginComponent} from './auth/login.component';
import {RegisterComponent} from './auth/register.component';
import {MessageService} from './message.service';
import {ErrorMessagesService} from './error.messages.service';
import {NgxCaptchaModule} from 'ngx-captcha';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {SharedModule} from './shared.module';
import {OrderService} from './services/order/order.service';

import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

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

import {captchar_key} from './const';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        // import HttpClientModule after BrowserModule.
        HttpClientModule,
        HttpClientXsrfModule.withOptions({
            cookieName: 'My-Xsrf-Cookie',
            headerName: 'My-Xsrf-Header',
        }),

        // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
        // and returns simulated server responses.
        // Remove it when a real server is ready to receive requests.
        HttpClientInMemoryWebApiModule.forRoot(
            InMemoryDataService, {
                dataEncapsulation: false,
                passThruUnknownUrl: true,
                put204: false // return entity after PUT/update
            }
        ),
        routing,
        AppAsideModule,
        AppFooterModule,
        AppHeaderModule,
        AppSidebarModule,
        PerfectScrollbarModule,
        NgxCaptchaModule.forRoot({
            reCaptcha2SiteKey: captchar_key
        }),
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
        RegisterComponent
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
