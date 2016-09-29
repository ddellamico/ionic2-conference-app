import { UserModel } from '../../../core/providers/auth/user-model';
/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

export interface AuthState {
  loading: boolean;
  currentUser: UserModel;
  error: string;
}

export const defaultState: AuthState = {
  loading: false,
  currentUser: null,
  error: null
};
