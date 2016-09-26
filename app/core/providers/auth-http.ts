/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

// Reference : https://github.com/auth0/angular2-jwt/issues/37

import { Injectable } from '@angular/core';
import { Http, Request, Response, RequestOptionsArgs } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { AuthActions } from '../actions/auth-action';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers/index';

@Injectable()
export class JwtAuthHttp extends AuthHttp {
  constructor(options: AuthConfig,
              http: Http,
              public authActions: AuthActions,
              public store: Store<AppState>) {
    super(options, http);
  }

  private isUnauthorized(status: number): boolean {
    return status === 401;
  }

  public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    const response = super.request(url, options);
    response.subscribe(null, err => {
      if (this.isUnauthorized(err.status)) {
        this.store.dispatch(
          this.authActions.unauthorized()
        );
      }
    });
    return response;
  }
}
