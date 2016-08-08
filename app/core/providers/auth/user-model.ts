/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

export class UserModel {

  private static _favorites: Array<String> = [];

  static hasFavorite(sessionName) {
    return (this._favorites.indexOf(sessionName) > -1);
  }

  static addFavorite(sessionName) {
    this._favorites.push(sessionName);
  }

  static removeFavorite(sessionName) {
    const index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  }

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
