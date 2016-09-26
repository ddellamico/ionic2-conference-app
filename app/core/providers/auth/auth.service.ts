/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Storage } from 'ionic-angular';
import { BaseService } from '../base-service';
import { UserModel } from './user-model';

@Injectable()
export class AuthService extends BaseService {

  private loggedUser: UserModel = null;
  private USER_KEY: string = 'user_key';
  private TOKEN_KEY: string = 'id_token';

  public static authenticated(): Observable<boolean> {
    const _authenticated: boolean = tokenNotExpired() || false;
    return Observable.of(_authenticated);
  }

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
      .switchMap((res: any) => this.validateToken(res.access_token))
      .map((user: UserModel) => {
        if (user && user._id) {
          this.loggedUser = user;
        }
        return this.loggedUser;
      })
      .catch((err: any) => this.handleError(err));
  }

  public getLoggedUser(): Observable<UserModel> {
    if (!tokenNotExpired()) {
      return Observable.throw('Invalid token');
    }
    if (this.loggedUser !== null) {
      return Observable.of(this.loggedUser);
    }
    const userKey$ = Observable.fromPromise(this.storage.get(this.USER_KEY));
    return userKey$.map((data) => {
      const _user: UserModel = JSON.parse(data);
      if (_user && _user._id) {
        this.loggedUser = new UserModel(_user._id, _user.firstName, _user.lastName, _user.username, _user.roles);
        return this.loggedUser;
      } else {
        this.loggedUser = null;
        return null;
      }
    }).catch((err: any) => this.handleError(err));
  }


  public signUp(firstName: string, lastName: string, username: string, password: string): Observable<boolean> {
    const url: string = `${process.env.API_URL}/users`;
    const body = JSON.stringify({
      firstName,
      lastName,
      username,
      password
    });
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(url, body, options)
      .map((res: Response) => <any>res.json())
      .mergeMap((user: any) => {
        return this.token(username, password);
      })
      .catch((err: any) => {
        return this.handleError(err);
      });
  }

  public logout(): Observable<any> {
    return Observable.forkJoin(
      Observable.fromPromise(this.storage.remove(this.TOKEN_KEY)),
      Observable.fromPromise(this.storage.remove(this.USER_KEY))
    ).do(() => {
      this.loggedUser = null;
    }).catch((err: any) => this.handleError(err));
  }

  private validateToken(token: string): Observable<any> {
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      return Observable.throw('Invalid token');
    }
    const setToken$ = Observable.fromPromise(this.storage.set(this.TOKEN_KEY, token));

    return setToken$.switchMap(() => {
      const decoded: any = this.jwtHelper.decodeToken(token);
      const _user = decoded.user;
      const userModel = new UserModel(_user._id, _user.firstName, _user.lastName, _user.username, _user.roles);
      return Observable.fromPromise(
        this.storage.set(this.USER_KEY, JSON.stringify(userModel)).then(() => userModel)
      );
    });
  }
}
