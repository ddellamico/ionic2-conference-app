/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AuthActions } from '../actions/auth-action';
import { AppState } from '../reducers/index';
import { AuthSelector } from '../selectors/auth-selector';

@Injectable()
export class AuthStoreService {

  constructor(private store: Store<AppState>,
              private authActions: AuthActions) {
  }

  public dispatchCheckToken(): void {
    this.store.dispatch(
      this.authActions.checkToken()
    );
  }

  public dispatchLogout(): void {
    this.store.dispatch(
      this.authActions.logout()
    );
  }

  public isLoggedIn(): Observable<boolean> {
    return this.store.let(AuthSelector.isLoggedIn());
  }

  public isLoading(): Observable<boolean> {
    return this.store.let(AuthSelector.isLoading());
  }

  public getErrorMessage(): Observable<string> {
    return this.store.let(AuthSelector.getErrorMessage());
  }

  public auth(username: string, password: string) {
    this.store.dispatch(
      this.authActions.auth(username, password)
    );
  }
}
