/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Storage, LocalStorage, Events } from 'ionic-angular';
import { AuthEvents } from '../../constants';
import '../../helpers/rxjs-operators';
import { BaseService } from '../base-service';
import { UserModel } from './user-model';

@Injectable()
export class AuthService extends BaseService {

  private loggedUser: UserModel = null;
  private storage = new Storage(LocalStorage);
  private jwtHelper = new JwtHelper();
  private USER_KEY: string = 'user_key';
  private TOKEN_KEY: string = 'id_token';

  public static authenticated() {
    const _authenticated: boolean = tokenNotExpired() || false;
    console.log('_authenticated ===>', _authenticated);
    return _authenticated;
  }

  constructor(private http: Http, events: Events) {
    super(events);
  }

  public token(username: string, password: string): Observable<boolean> {
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
      .mergeMap((res: any) => {
        return Observable.fromPromise(this.validateToken(res.access_token));
      })
      .catch((err: any) => {
        this.logout();
        return this.handleError(err);
      });
  }

  public getLoggedUser(): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      if (!tokenNotExpired()) {
        reject('Invalid token');
        this.logout();
      }
      this.storage.get(this.USER_KEY).then((data) => {
        const _user = JSON.parse(data);
        if (_user && _user._id) {
          this.loggedUser = new UserModel(_user._id, _user.firstName, _user.lastName, _user.username, _user.roles);
          resolve(this.loggedUser);
        } else {
          reject('Invalid user data');
        }
      }).catch((err) => {
        reject(err);
      });
    });
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
        this.logout();
        return this.handleError(err);
      });
  }

  public logout(): void {
    this.storage.remove(this.TOKEN_KEY);
    this.storage.remove(this.USER_KEY);
    this.loggedUser = null;
    this.events.publish(AuthEvents.USER_LOGOUT);
  }

  private validateToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!token || this.jwtHelper.isTokenExpired(token)) {
        this.logout();
        Promise.reject('Invalid token');
      }
      const decoded: any = this.jwtHelper.decodeToken(token);
      this.storage.set(this.TOKEN_KEY, token)
        .then(() => {
          const _user = decoded.user;
          this.loggedUser = new UserModel(_user._id, _user.firstName, _user.lastName, _user.username, _user.roles);
          return this.storage.set(this.USER_KEY, JSON.stringify(this.loggedUser));
        })
        .then(() => {
          this.events.publish(AuthEvents.USER_LOGIN);
          resolve(true);
        })
        .catch((err) => {
          this.logout();
          reject(err);
        });
    });
  }
}
