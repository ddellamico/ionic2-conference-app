/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

/**
 * Instead of passing around action string constants and manually recreating
 * action objects at the point of dispatch, we create services encapsulating
 * each appropriate action group. Action types are included as static
 * members and kept next to their action creator. This promotes a
 * uniform interface and single import for appropriate actions
 * within your application components.
 */
@Injectable()
export class AuthActions {

  static AUTH = '[Auth] Login';

  auth(username: string, password: string): Action {
    return {
      type: AuthActions.AUTH,
      payload: {
        username,
        password
      }
    };
  }

  static AUTH_SUCCESS = '[Auth] Login Success';

  authSuccess(loggedIn: boolean): Action {
    return {
      type: AuthActions.AUTH_SUCCESS,
      payload: loggedIn
    };
  }

  static AUTH_FAILED = '[Auth] Login Failed';

  authError(err: any): Action {
    return {
      type: AuthActions.AUTH_FAILED,
      payload: err
    };
  }
}
