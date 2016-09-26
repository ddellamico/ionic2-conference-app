/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { ActionReducer, Action } from '@ngrx/store';
import { AuthState, defaultState } from './auth-state';
import { AuthActions } from '../../actions/auth-action';
import { UserModel } from '../../providers/auth/user-model';

export const authReducer: ActionReducer<AuthState> = (state: AuthState = defaultState, action: Action) => {
  switch (action.type) {

    case AuthActions.AUTH:
    case AuthActions.CHECK_TOKEN:
    case AuthActions.UNAUTHORIZED:
    case AuthActions.LOGOUT: {
      return Object.assign({}, state, {
        loaded: false,
        loading: true,
        loggedIn: false,
        error: null
      });
    }

    case AuthActions.AUTH_COMPLETED: {
      const user: UserModel = action.payload;
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        loggedIn: true,
        currentUser: user,
        error: null
      });
    }

    case AuthActions.CHECK_TOKEN_COMPLETED: {
      const user: UserModel = action.payload;
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        currentUser: user,
        error: null
      });
    }

    case AuthActions.AUTH_FAILED: {
      const error: any = action.payload;
      return Object.assign({}, state, {
        error,
        loaded: true,
        loading: false,
        loggedIn: false
      });
    }

    case AuthActions.LOGOUT_SUCCESS: {
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        loggedIn: false,
        currentUser: null,
        error: null
      });
    }

    default:
      return state;
  }
};
