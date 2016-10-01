/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

// Reference http://lathonez.github.io/2016/ionic-2-unit-testing/

import { provide } from '@angular/core';
import { beforeEachProviders, inject } from '@angular/core/testing';
import { Events, Platform } from 'ionic-angular';
import { ConferenceApp } from './app';
import { Observable } from 'rxjs/Observable';
import { AuthProvider } from './core/providers/auth/auth.provider';
import { ConferenceProvider } from './core/providers/conference/conference.provider';
import { AuthService } from './core/services/auth.service';

// Mock out Ionic's platform class
class PlatformMock {
  public ready(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }
}

class AuthServiceMock {
  public logout(): Observable<any> {
    return Observable.of(true);
  }
}

class ConferenceServiceMock {
  public clearCache(): void {
  }
}

let conferenceApp: ConferenceApp;

describe('ConferenceApp', () => {

  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    Events,
    ConferenceProvider,
    provide(AuthProvider, {useClass: AuthServiceMock}),
    provide(ConferenceProvider, {useClass: ConferenceServiceMock}),
    provide(Platform, {useClass: PlatformMock}),
  ]);

  let platform;
  beforeEach(inject([Events, AuthService, ConferenceProvider, Platform], (_events: Events,
                                                                          _authStoreService: AuthService,
                                                                          _conferenceService: ConferenceProvider,
                                                                          _platform: Platform) => {
    platform = _platform;
    spyOn(_platform, 'ready').and.callThrough();
    conferenceApp = new ConferenceApp(_authStoreService, _platform);
  }));

  it('should initialize with an app', () => {
    expect(conferenceApp['app']).not.toBe(null);
  });

  it('should have a root page', () => {
    expect(conferenceApp['rootPage']).not.toBe(null);
  });

  it('should call platform ready', () => {
    expect(platform.ready).toHaveBeenCalled();
  });

  it('should have 4 main pages', () => {
    expect(conferenceApp.appPages.length).toEqual(4);
  });

  it('should have 2 "logged in" pages', () => {
    expect(conferenceApp.loggedInPages.length).toEqual(2);
  });

  it('should have 2 "logged out" pages', () => {
    expect(conferenceApp.loggedOutPages.length).toEqual(2);
  });
});
