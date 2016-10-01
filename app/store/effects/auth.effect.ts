/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Injectable } from '@angular/core';
import { Effect, StateUpdates, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { AuthActions } from '../actions/auth.action';
import { AppState } from '../reducers/index';
import { ConferenceProvider } from '../../core/providers/conference/conference.provider';
import { AuthProvider } from '../../core/providers/auth/auth.provider';
import { UserModel } from '../../core/providers/auth/user.model';
import { SignupModel } from '../../core/providers/auth/signup.model';

@Injectable()
export class AuthEffect {

  constructor(private updates$: StateUpdates<AppState>,
              private conferenceService: ConferenceProvider,
              private authService: AuthProvider,
              private authActions: AuthActions) {
  }

  // @Effect() checkTokenOnInit$ = Observable.of(AuthActions.CHECK_TOKEN);

  @Effect() login$ = this.updates$
    .whenAction(AuthActions.AUTH)
    .map<any>(toPayload)
    .switchMap((payload) => this.authService.token(payload.username, payload.password)
      .map((user: UserModel) => this.authActions.authCompleted(user))
      .catch((err) =>
        Observable.of(this.authActions.authError(err))
      )
    );

  @Effect() checkToken$ = this.updates$
    .whenAction(AuthActions.CHECK_TOKEN)
    .switchMap(() => this.authService.getLoggedUser()
      .map((user: UserModel) => {
        return this.authActions.checkTokenCompleted(user);
      })
      .catch((err) =>
        Observable.of(this.authActions.checkTokenCompleted(null))
      )
    );

  @Effect() signUp$ = this.updates$
    .whenAction(AuthActions.SIGNUP)
    .map<any>(toPayload)
    .switchMap((payload: SignupModel) => this.authService.signUp(payload)
      .map((user: UserModel) => this.authActions.signUpCompleted(user))
      .catch((err) =>
        Observable.of(this.authActions.signUpFailed(err))
      )
    );

  @Effect() signUpSuccess$ = this.updates$
    .whenAction(AuthActions.SIGNUP_COMPLETED)
    .do(() => this.conferenceService.clearCache());

  @Effect() logout$ = this.updates$
    .whenAction(AuthActions.LOGOUT, AuthActions.UNAUTHORIZED)
    .switchMap(() => this.authService.logout()
      .map(() => this.authActions.logoutSuccess())
    );

  @Effect() logoutSuccess$ = this.updates$
    .whenAction(AuthActions.LOGOUT_SUCCESS)
    .do(() => this.conferenceService.clearCache())
    .ignoreElements();

}
