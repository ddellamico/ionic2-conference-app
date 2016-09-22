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
import { AuthService } from '../providers/auth/auth-service';

@Injectable()
export class AuthEffect {

  constructor(private updates$: StateUpdates<AppState>,
              private authService: AuthService,
              private authActions: AuthActions) {
  }

  @Effect() login$ = this.updates$
    .whenAction(AuthActions.AUTH)
    .map<any>(toPayload)
    .switchMap((payload) => this.authService.token(payload.username, payload.password)
      .map((loggedIn: boolean) => this.authActions.authSuccess(loggedIn))
      .catch((err) => Observable.of(this.authActions.authError(err)))
    );
}
