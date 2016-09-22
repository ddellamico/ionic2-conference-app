/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { AppState } from '../reducers/index';
import { AuthState } from '../reducers/auth/auth-state';

/**
 * reference : https://gist.github.com/btroncone/a6e4347326749f938510#extracting-selectors-for-reuse
 */
export class AuthSelector {

  /**
   * Every reducer module exports selector functions, however child reducers
   * have no knowledge of the overall state tree. To make them useable, we
   * need to make new selectors that wrap them.
   *
   * Once again our compose function comes in handy. From right to left, we
   * first select the auths state then we pass the state to the auth
   * reducer's _getAuthItems selector, finally returning an observable
   * of search results.
   */
  public static isLoggedIn(): (selector: Observable<AppState>) => Observable<boolean> {
    return compose(this._isLoggedIn(), this.getAuthState());
  }

  public static getErrorMessage(): (selector: Observable<AppState>) => Observable<string> {
    return compose(this._getErrorMessage(), this.getAuthState());
  }

  public static isLoading(): (selector: Observable<AppState>) => Observable<boolean> {
    return compose(this._isLoading(), this.getAuthState());
  }

  public static isLoaded(): (selector: Observable<AppState>) => Observable<boolean> {
    return compose(this._isLoaded(), this.getAuthState());
  }

  private static getAuthState() {
    return (state$: Observable<AppState>) => state$.select(s => s.auth);
  }

  private static _getErrorMessage() {
    return (state$: Observable<AuthState>) => state$.select(s => {
      return s.error;
    });
  }

  private static _isLoggedIn() {
    return (state$: Observable<AuthState>) => state$
      .select(s => s.loggedIn);
  }

  private static _isLoaded() {
    return (state$: Observable<AuthState>) => state$
      .select(s => s.loaded);
  }

  private static _isLoading() {
    return (state$: Observable<AuthState>) => state$
      .select(s => s.loading);
  }
}
