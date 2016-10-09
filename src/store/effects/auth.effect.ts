/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AuthActions } from '../actions/auth.action';
import { ConferenceProvider } from '../../core/providers/conference/conference.provider';
import { AuthProvider } from '../../core/providers/auth/auth.provider';
import { UserModel } from '../../core/providers/auth/user.model';
import { SignupModel } from '../../core/providers/auth/signup.model';

@Injectable()
export class AuthEffect {

  constructor(private actions$: Actions,
              private conferenceService: ConferenceProvider,
              private authService: AuthProvider,
              private authActions: AuthActions) {
  }

  @Effect()
  login$: Observable<Action> = this.actions$
    .ofType(AuthActions.AUTH)
    .map<any>(toPayload)
    .switchMap((payload) => this.authService.token(payload.username, payload.password)
      .map((user: UserModel) => this.authActions.authCompleted(user))
      .catch((err) =>
        Observable.of(this.authActions.authError(err))
      )
    );

  @Effect()
  logout$: Observable<Action> = this.actions$
    .ofType(AuthActions.LOGOUT, AuthActions.UNAUTHORIZED)
    .do(() => this.authService.logout())
    .map(() => this.authActions.logoutSuccess());

  @Effect()
  checkToken$: Observable<Action> = this.actions$
    .ofType(AuthActions.CHECK_TOKEN)
    .switchMap(() => this.authService.getLoggedUser()
      .map((user: UserModel) => {
        return this.authActions.checkTokenCompleted(user);
      })
      .catch((err) =>
        Observable.of(this.authActions.checkTokenCompleted(null))
      )
    );

  @Effect()
  signUp$: Observable<Action> = this.actions$
    .ofType(AuthActions.SIGNUP)
    .map<any>(toPayload)
    .switchMap((payload: SignupModel) => this.authService.signUp(payload)
      .map((user: UserModel) => this.authActions.signUpCompleted(user))
      .catch((err) =>
        Observable.of(this.authActions.signUpFailed(err))
      )
    );
}
