/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { ActionReducer, Action } from '@ngrx/store';
import { AuthState, defaultState } from './auth.state';
import { AuthActions } from '../../actions/auth.action';
import { UserModel } from '../../../core/providers/auth/user.model';

export const authReducer: ActionReducer<AuthState> = (state: AuthState = defaultState, action: Action) => {
  switch (action.type) {

    case AuthActions.AUTH:
    case AuthActions.CHECK_TOKEN:
    case AuthActions.UNAUTHORIZED:
    case AuthActions.LOGOUT: {
      return Object.assign({}, state, {
        currentUser: null,
        loading: true,
        error: null
      });
    }

    case AuthActions.SIGNUP_COMPLETED:
    case AuthActions.AUTH_COMPLETED:
    case AuthActions.CHECK_TOKEN_COMPLETED: {
      const user: UserModel = action.payload;
      return Object.assign({}, state, {
        currentUser: user,
        loading: false,
        error: null
      });
    }

    case AuthActions.AUTH_FAILED:
    case AuthActions.SIGNUP_FAILED: {
      const error: any = action.payload;
      return Object.assign({}, state, {
        currentUser: null,
        loading: false,
        error,
      });
    }

    case AuthActions.LOGOUT_SUCCESS: {
      return Object.assign({}, state, {
        currentUser: null,
        loading: false,
        error: null
      });
    }

    default:
      return state;
  }
};
