/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */


import { Component, ViewChild, provide } from '@angular/core';
import { HTTP_PROVIDERS, Http } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';
import { ionicBootstrap, Events, Platform, Nav, Storage, LocalStorage } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { provideStore } from '@ngrx/store';
import { runEffects } from '@ngrx/effects';

import { AccountPage, LoginPage, SignupPage, TabsPage, TutorialPage } from './pages';

import { ConferenceService } from './core/providers/conference/conference-service';
import { AuthService } from './core/providers/auth/auth-service';
import { ScheduleService } from './core/providers/schedule/schedule-service';
import { SpeakerService } from './core/providers/speakers/speaker-service';
import { MapService } from './core/providers/map/map-service';

import { NotificationService } from './core/helpers/notifications';
import { Subscription } from 'rxjs/Subscription';

import effects from './core/effects';
import actions from './core/actions';
import reducers from './core/reducers';
import storeServices from './core/store';

import { AuthStoreService } from './core/store/auth.service';

@Component({
  template: require('./app.html')
})
export class ConferenceApp {

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageObj[] = [
    {title: 'Schedule', component: TabsPage, icon: 'calendar'},
    {title: 'Speakers', component: TabsPage, index: 1, icon: 'contacts'},
    {title: 'Map', component: TabsPage, index: 2, icon: 'map'},
    {title: 'About', component: TabsPage, index: 3, icon: 'information-circle'}
  ];
  loggedInPages: PageObj[] = [
    {title: 'Account', component: AccountPage, icon: 'person'},
    {title: 'Logout', component: TabsPage, icon: 'log-out'}
  ];
  loggedOutPages: PageObj[] = [
    {title: 'Login', component: LoginPage, icon: 'log-in'},
    {title: 'Signup', component: SignupPage, icon: 'person-add'}
  ];

  rootPage: any = TutorialPage;

  private authenticated: boolean = false;
  private authSub: Subscription;

  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) private nav: Nav;

  constructor(private events: Events,
              private authStoreService: AuthStoreService,
              private conferenceService: ConferenceService,
              private platform: Platform) {
    // Call any initial plugins when ready
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    setTimeout(() => {
      this.initAuth();
    }, 2000);
  }

  private initAuth(): void {
    console.log('===========> initAuth');
    this.authSub = this.authStoreService.isLoggedIn().subscribe((loggedIn) => {
      console.log('this.appService.isLoggedIn() ===> ', loggedIn);
      if (loggedIn === null) {
        return;
      }
      if (!loggedIn) {
        this.conferenceService.clearCache();
        this.authenticated = false;
        if (this.nav) {
          this.nav.setRoot(LoginPage);
        }
      } else {
        this.authenticated = true;
        if (this.nav) {
          this.nav.push(TabsPage);
        }
      }
    });
  }

  openPage(page: PageObj) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, {tabIndex: page.index});

    } else {
      this.nav.setRoot(page.component);
    }

    if (page.title === 'Logout') {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.authStoreService.dispatchLogout();
      }, 100);
    }
  }

  ngOnDestroy() {
    // don't forget to clean up the subscriptions
    this.authSub.unsubscribe();
  }
}


// Pass the main App component as the first argument
// Pass any providers for your app in the second argument
// Set any config for your app as the third argument, see the docs for
// more ways to configure your app:
// http://ionicframework.com/docs/v2/api/config/Config/
// Place the tabs on the bottom for all platforms
// See the theming docs for the default values:
// http://ionicframework.com/docs/v2/theming/platform-specific-styles/

ionicBootstrap(ConferenceApp, [HTTP_PROVIDERS, AuthService, ConferenceService,
  storeServices, ScheduleService, SpeakerService, MapService, NotificationService,
  disableDeprecatedForms(), // disable deprecated forms
  provideForms(), // enable new forms module
  provide(AuthHttp, {
    useFactory: (http) => {
      return new AuthHttp(new AuthConfig({noJwtError: true}), http);
    },
    deps: [Http]
  }),
  provide(JwtHelper, {useFactory: () => new JwtHelper()}),
  provide(Storage, {useFactory: () => new Storage(LocalStorage)}),
  provideStore(reducers),
  runEffects(effects),
  actions
]);
