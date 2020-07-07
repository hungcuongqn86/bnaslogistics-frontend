import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {of, Observable} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import {AuthService} from './auth.service';
import {tokens_key} from './const';

@Injectable()
export class AppGuard implements CanActivate {
    constructor(private auth: AuthService) {
    }

    canActivate(): Observable<any> {
        if (this.auth.checkLogin() === '') {
            this.fall();
            return of(false);
        }
        return this.auth.checkAccess()
            .pipe(
                map((response: any) => {
                    if (response.success) {
                        this.pass(response.success);
                        return true;
                    } else {
                        this.fall();
                        return of(false);
                    }
                }),
                catchError(() => {
                    this.fall();
                    return of(false);
                })
            );
    }

    private pass(user) {
        this.auth.user = user;
        const key = btoa(tokens_key);
        if (localStorage[key]) {
            const auth = JSON.parse(atob(localStorage.getItem(key)));
            const data = {type: 'CART_TOKEN', id: auth.access_token};
            window.postMessage(data, '*');
        }
    }

    private fall() {
        this.auth.logout();
    }
}
