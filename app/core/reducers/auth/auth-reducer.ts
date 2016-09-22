/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { ActionReducer, Action } from '@ngrx/store';
import { AuthState, defaultState } from './auth-state';
import { AuthActions } from '../../actions/auth-action';

export const authReducer: ActionReducer<AuthState> = (state: AuthState = defaultState, action: Action) => {
  switch (action.type) {

    case AuthActions.AUTH: {
      return Object.assign({}, state, {
        loaded: false,
        loading: true,
        loggedIn: false,
        error: null
      });
    }

    case AuthActions.AUTH_SUCCESS: {
      const loggedIn: boolean = action.payload;
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        loggedIn: loggedIn,
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

    default:
      return state;
  }
};
