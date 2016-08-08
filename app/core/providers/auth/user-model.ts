/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

export class UserModel {
  constructor(public _id: string,
              public firstName: string,
              public lastName: string,
              public username: string,
              public roles?: Array<String>) {
  }

  isAdmin(): boolean {
    return this.roles.length && this.roles.indexOf('admin') > -1;
  }
}
