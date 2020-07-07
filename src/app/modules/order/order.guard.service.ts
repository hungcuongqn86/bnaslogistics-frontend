import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {of, Observable} from 'rxjs';
import {AuthService} from '../../auth.service';

@Injectable()
export class OrderGuardService implements CanActivate {
    constructor(private auth: AuthService) {
    }

    canActivate(): Observable<any> {
        if (this.auth.user.type > 0) {
            this.fall();
            return of(false);
        }
        if (this.auth.hasRole('custumer')) {
            this.fall();
            return of(false);
        }

        return of(true);
    }

    private fall() {
        this.auth.logout();
    }
}
