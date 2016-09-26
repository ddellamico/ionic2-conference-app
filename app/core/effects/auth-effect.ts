/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Injectable } from '@angular/core';
import { Effect, StateUpdates, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { AuthActions } from '../actions/auth-action';
import { AppState } from '../reducers/index';
import { AuthService } from '../providers/auth/auth.service';
import { UserModel } from '../providers/auth/user-model';
import { ConferenceService } from '../providers/conference/conference-service';

@Injectable()
export class AuthEffect {

  constructor(private updates$: StateUpdates<AppState>,
              private conferenceService: ConferenceService,
              private authService: AuthService,
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

  @Effect() logout$ = this.updates$
    .whenAction(AuthActions.LOGOUT, AuthActions.UNAUTHORIZED)
    .switchMap(() => this.authService.logout()
      .map((loggedIn: boolean) => this.authActions.logoutSuccess())
    );

  @Effect() logoutNav$ = this.updates$
    .whenAction(AuthActions.LOGOUT_SUCCESS)
    .do(() => this.conferenceService.clearCache())
    .ignoreElements();

}
