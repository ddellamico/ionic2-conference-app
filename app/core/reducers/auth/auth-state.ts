/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

export interface AuthState {
  loaded: boolean;
  loading: boolean;
  loggedIn: boolean;
  error: string;
}


export const defaultState: AuthState = {
  loaded: false,
  loading: false,
  loggedIn: false,
  error: null
};
