/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

export class UxMessage {
  public static get INVALID_CREDENTIALS(): string {
    return 'Invalid credentials';
  }

  public static get SIGNUP_ERROR(): string {
    return 'Signup error, please try again';
  }

  public static get UNKNOWN_ERROR(): string {
    return 'Unknown error, please try again later';
  }
}
