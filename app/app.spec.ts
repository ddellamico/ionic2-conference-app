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
import { AuthService } from './core/providers/auth/auth-service';
import { ConferenceService } from './core/providers/conference/conference-service';

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
    ConferenceService,
    provide(AuthService, {useClass: AuthServiceMock}),
    provide(ConferenceService, {useClass: ConferenceServiceMock}),
    provide(Platform, {useClass: PlatformMock}),
  ]);

  beforeEach(inject([Events, AuthService, ConferenceService, Platform], (_events: Events, _authService: AuthService,
                                                                         _conferenceService: ConferenceService,
                                                                         _platform: Platform) => {
    conferenceApp = new ConferenceApp(_events, _authService, _conferenceService, _platform);
  }));

  it('should initialize with an app', () => {
    expect(conferenceApp['app']).not.toBe(null);
  });

  it('should have a root page', () => {
    expect(conferenceApp['rootPage']).not.toBe(null);
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
