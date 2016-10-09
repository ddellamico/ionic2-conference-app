/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AuthActions } from '../../store/actions/auth.action';
import { AppState } from '../../store/reducers/index';
import { AuthSelector } from '../../store/selectors/auth.selector';
import { UserModel } from '../providers/auth/user.model';
import { SignupModel } from '../providers/auth/signup.model';

@Injectable()
export class AuthService {

  constructor(private store: Store<AppState>,
              private authActions: AuthActions) {
  }

  public dispatchCheckToken(): void {
    this.store.dispatch(
      this.authActions.checkToken()
    );
  }

  public dispachAuth(username: string, password: string) {
    this.store.dispatch(
      this.authActions.auth(username, password)
    );
  }

  public dispachSignin(data: SignupModel) {
    this.store.dispatch(
      this.authActions.signUp(data)
    );
  }

  public dispatchLogout(): void {
    this.store.dispatch(
      this.authActions.logout()
    );
  }

  public loggedIn(): Observable<boolean> {
    return this.getCurrentUser()
      .combineLatest(this.isLoading(), (user, isLoading) => ({
        user,
        isLoading
      }))
      .filter(({isLoading}) => !isLoading)
      .map(({user}) => !!(user && user._id))
      .delay(100) // TODO necessary in order to make nav push work ..
      .distinctUntilChanged();
  }

  public getCurrentUser(): Observable<UserModel> {
    return this.store.let(AuthSelector.getCurrentUser());
  }

  public isLoading(): Observable<boolean> {
    return this.store.let(AuthSelector.isLoading());
  }

  public getErrorMessage(): Observable<string> {
    return this.store.let(AuthSelector.getErrorMessage());
  }
}
