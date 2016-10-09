/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JwtHelper } from 'angular2-jwt';
import { Storage } from '@ionic/storage';
import { BaseProvider } from '../base.provider';
import { UserModel } from './user.model';
import { SignupModel } from './signup.model';
import { AuthConst } from '../../constants';

@Injectable()
export class AuthProvider extends BaseProvider {

  constructor(private http: Http,
              private jwtHelper: JwtHelper,
              private storage: Storage) {
    super();
  }

  public token(username: string, password: string): Observable<UserModel> {
    const url: string = `${process.env.API_URL}/auth/token`;

    const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    const options = new RequestOptions({headers: headers});

    const payload = new URLSearchParams();
    payload.set('grant_type', 'password');
    payload.set('username', username);
    payload.set('password', password);
    payload.set('client_id', process.env.CLIENT_ID);
    payload.set('client_secret', process.env.CLIENT_SECRET);

    return this.http.post(url, payload.toString(), options)
      .map((res: Response) => <any>res.json())
      .map((res: any) => this.validateToken(res.access_token))
      .catch((err: any) => this.handleError(err));
  }

  public getLoggedUser(): Observable<UserModel> {
    return Observable.forkJoin(
      this.storage.get(AuthConst.TOKEN_KEY),
      this.storage.get(AuthConst.USER_KEY)
    ).map((data) => {
      const jwtToken = data[0];
      if (!jwtToken || this.jwtHelper.isTokenExpired(jwtToken)) {
        console.log('AuthProvider ==> token expired');
        return null;
      }
      const _user = JSON.parse(data[1]);
      return new UserModel(_user._id, _user.firstName, _user.lastName, _user.username, _user.roles);
    }).catch((err: any) => this.handleError(err));
  }

  public signUp(data: SignupModel): Observable<UserModel> {
    const url: string = `${process.env.API_URL}/users`;
    const body = JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      password: data.password
    });
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(url, body, options)
      .map((res: Response) => <any>res.json())
      .mergeMap(() => this.token(data.username, data.password))
      .catch((err: any) => this.handleError(err));
  }

  public logout(): void {
    console.log('AuthProvider ==> logout');
    this.storage.clear();
  }

  private validateToken(token: string): UserModel {
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      return null;
    }
    try {
      this.storage.set(AuthConst.TOKEN_KEY, token);
      const decoded: any = this.jwtHelper.decodeToken(token);
      const _user = decoded.user;
      const userModel: UserModel = new UserModel(_user._id, _user.firstName, _user.lastName, _user.username,
        _user.roles);
      if (!userModel || !userModel._id) {
        return null;
      }
      this.storage.set(AuthConst.USER_KEY, JSON.stringify(userModel));
      return userModel;
    } catch (ex) {
      this.handleError(ex);
    }
  }
}
