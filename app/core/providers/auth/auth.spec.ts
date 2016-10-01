/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { provide } from '@angular/core';
import { beforeEachProviders, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { JwtHelper } from 'angular2-jwt';
import { AuthProvider } from './auth.provider';
import { LocalStorage, Storage, Events } from 'ionic-angular';

describe('AuthProvider', () => {

  // tslint:disable-next-line
  const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU2OTI4MjBmNzgyMmU3OTMyMmQ2NzFlMSIsInVwZGF0ZWRfYXQiOiIyMDE2LTA4LTA3VDE5OjI2OjI1LjE2OFoiLCJjcmVhdGVkX2F0IjoiMjAxNi0wOC0wN1QxOToyNjoyNS4xNjhaIiwiZmlyc3ROYW1lIjoiRGFtaWVuIiwibGFzdE5hbWUiOiJEZWxsJ0FtaWNvIiwidXNlcm5hbWUiOiJkYW1pZW4uZGVsbGFtaWNvQGdtYWlsLmNvbSIsInJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiaXNzIjoiaHR0cHM6Ly9pb24tY29uZi1hcGkuZGFtaWVuZGV2LmNvbSIsImF1ZCI6IjU3YTc4YjYwYjA4ZThhMmMwMGJjNzE2ZSIsImlhdCI6MTQ3MTUwNjkzMywiZXhwIjoxNDcxNTkzMzMzfQ.1279dTkBQt82kAehs9fptHMVCLkJ-WfqwUGSaKUwllM';
  let backend, authService, storage, events;

  class JwtHelperMock extends JwtHelper {
    public isTokenExpired(token: string, offsetSeconds?: number): boolean {
      return false;
    }
  }

  const mockHttpProvider = {
    deps: [MockBackend, BaseRequestOptions],
    useFactory: (_backend: MockBackend, defaultOptions: BaseRequestOptions) => {
      return new Http(_backend, defaultOptions);
    }
  };

  beforeEachProviders(() => [
    AuthProvider,
    Events,
    BaseRequestOptions,
    MockBackend,
    provide(Http, mockHttpProvider),
    provide(JwtHelper, {useClass: JwtHelperMock}),
    provide(Storage, {useFactory: () => new Storage(LocalStorage)})
  ]);

  beforeEach(inject([MockBackend, AuthProvider, Storage, Events], (_backend: MockBackend,
                                                                   _authService: AuthProvider,
                                                                   _storage: Storage,
                                                                   _events: Events) => {
    backend = _backend;
    authService = _authService;
    storage = _storage;
    events = _events;

    spyOn(storage, 'get').and.callThrough();
    spyOn(storage, 'set').and.callThrough();

    spyOn(events, 'publish').and.callThrough();
  }));

  it('should get error with invalid jwt token', () => {
    const baseResponse = new Response(new ResponseOptions({body: `{ "access_token": "12345" }`}));
    backend.connections.subscribe((c: MockConnection) => c.mockRespond(baseResponse));

    return authService.token('user', 'passwd').subscribe(
      () => console.log('logged in'),
      error => {
        expect(error).toBe('JWT must have 3 parts');
      }
    );
  });

  it('should sign in successfully with valid jwt token', () => {
    const baseResponse = new Response(new ResponseOptions({body: `{ "access_token": "${jwtToken}" }`}));
    backend.connections.subscribe((c: MockConnection) => c.mockRespond(baseResponse));

    return authService.token('user', 'passwd').subscribe((loggedIn: boolean) => {
        expect(loggedIn).toBe(true);
      }
    );
  });

  it('should call "storage" service when signed in', () => {
    const baseResponse = new Response(new ResponseOptions({body: `{ "access_token": "${jwtToken}" }`}));
    backend.connections.subscribe((c: MockConnection) => c.mockRespond(baseResponse));

    return authService.token('user', 'passwd').subscribe(() => {
        return authService.getLoggedUser().subscribe(loggedUser => {
          expect(storage.set).toHaveBeenCalledWith('user_key', JSON.stringify(loggedUser));
        });
      }
    );
  });

  it('should publish "login" event when signed in', () => {
    const baseResponse = new Response(new ResponseOptions({body: `{ "access_token": "${jwtToken}" }`}));
    backend.connections.subscribe((c: MockConnection) => c.mockRespond(baseResponse));

    return authService.token('user', 'passwd').subscribe(() => {
        expect(events.publish).toHaveBeenCalledWith(true);
      }
    );
  });

/*  it('should publish "dispatchLogout" event when signed out', () => {
    const baseResponse = new Response(new ResponseOptions({body: `{ "access_token": "${jwtToken}" }`}));
    backend.connections.subscribe((c: MockConnection) => c.mockRespond(baseResponse));

    return authService.dispatchLogout().subscribe(() => {
        expect(events.publish).toHaveBeenCalledWith(AuthEvents.USER_LOGOUT);
      }
    );
  });*/

});
