import { Component, ViewChild, provide } from '@angular/core';
import { HTTP_PROVIDERS, Http } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';
import { ionicBootstrap, Events, Platform, Nav, Storage, LocalStorage } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { ConferenceService } from './core/providers/conference/conference-service';

import { AccountPage } from './pages/account/account';
import { TabsPage } from './pages/tabs/tabs';
import { LoginPage } from './pages/login/login';
import { SignupPage } from './pages/signup/signup';
import { AuthService } from './core/providers/auth/auth-service';
import { ScheduleService } from './core/providers/schedule/schedule-service';
import { SpeakerService } from './core/providers/speakers/speaker-service';
import { TutorialPage } from './pages/tutorial/tutorial';
import { AuthEvents } from './core/constants';
import { MapService } from './core/providers/map/map-service';
import { NotificationService } from './core/helpers/ux/notification-service';

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

  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) private nav: Nav;

  constructor(private events: Events,
              private authService: AuthService,
              private conferenceService: ConferenceService,
              private platform: Platform) {
    // Call any initial plugins when ready
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
    this.authenticated = AuthService.authenticated();
    this.listenToLoginEvents();
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
        this.authService.logout().subscribe(() => console.log('logged out'));
      }, 1000);
    }
  }

  private listenToLoginEvents(): void {
    this.events.subscribe(AuthEvents.USER_LOGIN, () => {
      this.authenticated = true;
    });
    this.events.subscribe(AuthEvents.USER_SIGNUP, () => {
      this.authenticated = true;
    });
    this.events.subscribe(AuthEvents.USER_LOGOUT, () => {
      this.conferenceService.clearCache();
      this.authenticated = false;
      this.nav.setRoot(LoginPage);
    });

    this.events.subscribe(AuthEvents.USER_UNAUTHORIZED, () => {
      this.authService.logout().subscribe(() => {
        this.conferenceService.clearCache();
        this.authenticated = false;
        this.nav.setRoot(LoginPage);
      });
    });
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
  ScheduleService, SpeakerService, MapService, NotificationService,
  disableDeprecatedForms(), // disable deprecated forms
  provideForms(), // enable new forms module
  provide(AuthHttp, {
    useFactory: (http) => {
      return new AuthHttp(new AuthConfig({noJwtError: true}), http);
    },
    deps: [Http]
  }),
  provide(JwtHelper, {useFactory: () => new JwtHelper()}),
  provide(Storage, {useFactory: () => new Storage(LocalStorage)})
], {});
