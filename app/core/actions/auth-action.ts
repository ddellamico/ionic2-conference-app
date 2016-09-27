/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { UserModel } from '../providers/auth/user-model';
import { SignupModel } from '../providers/auth/signup-model';

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

  static AUTH_COMPLETED = '[Auth] Login Completed';

  authCompleted(user: UserModel = null): Action {
    return {
      type: AuthActions.AUTH_COMPLETED,
      payload: user
    };
  }


  static AUTH_FAILED = '[Auth] Login Failed';

  authError(err: any): Action {
    return {
      type: AuthActions.AUTH_FAILED,
      payload: err
    };
  }

  static SIGNUP = '[Auth] Signup';

  signUp(data: SignupModel): Action {
    return {
      type: AuthActions.SIGNUP,
      payload: data
    };
  }

  static SIGNUP_COMPLETED = '[Auth] Signup Completed';

  signUpCompleted(user: UserModel = null): Action {
    return {
      type: AuthActions.SIGNUP_COMPLETED,
      payload: user
    };
  }

  static SIGNUP_FAILED = '[Auth] Signup Failed';

  signUpFailed(err: any): Action {
    return {
      type: AuthActions.SIGNUP_FAILED,
      payload: err
    };
  }

  static CHECK_TOKEN = '[Auth] Check Token';

  checkToken(): Action {
    return {
      type: AuthActions.CHECK_TOKEN
    };
  }

  static CHECK_TOKEN_COMPLETED = '[Auth] Check Token Completed';

  checkTokenCompleted(user: UserModel = null): Action {
    return {
      type: AuthActions.CHECK_TOKEN_COMPLETED,
      payload: user
    };
  }

  static UNAUTHORIZED = '[Auth] Unauthorized';

  unauthorized(): Action {
    return {
      type: AuthActions.UNAUTHORIZED
    };
  }

  static LOGOUT = '[Auth] Logout';

  logout(): Action {
    return {
      type: AuthActions.LOGOUT
    };
  }

  static LOGOUT_SUCCESS = '[Auth] Logout Success';

  logoutSuccess(): Action {
    return {
      type: AuthActions.LOGOUT_SUCCESS
    };
  }
}
