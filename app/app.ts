/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Component, ViewChild, provide } from '@angular/core';
import { HTTP_PROVIDERS, Http } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { AuthConfig, JwtHelper } from 'angular2-jwt';
import { ionicBootstrap, Platform, Nav, Storage, LocalStorage } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { provideStore, Store } from '@ngrx/store';
import { runEffects } from '@ngrx/effects';

import { AccountPage, LoginPage, SignupPage, TabsPage, TutorialPage } from './pages';

import { ConferenceService } from './core/providers/conference/conference-service';
import { AuthService } from './core/providers/auth/auth.service';
import { ScheduleService } from './core/providers/schedule/schedule-service';
import { SpeakerService } from './core/providers/speakers/speaker-service';
import { MapService } from './core/providers/map/map-service';

import { NotificationService } from './core/helpers/notifications';

import effects from './core/effects';
import actions from './core/actions';
import reducers from './core/reducers';
import storeServices from './core/store';

import { AuthStoreService } from './core/store/auth-store.service';
import { UserModel } from './core/providers/auth/user-model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { SideMenuComponent } from './components/menu/menu.component';
import { JwtAuthHttp } from './core/providers/auth-http';
import { AuthActions } from './core/actions/auth-action';

@Component({
  template: `
  <ion-menu [content]="content">
  <ion-toolbar>
    <ion-title>Menu</ion-title>
  </ion-toolbar>
    <ion-content class="outer-content">
      <side-menu [currentUser]="currentUser$ | async"
        [appPages]="appPages"
        [loggedOutPages]="loggedOutPages"
        [loggedInPages]="loggedInPages"
        (openPage)="openPage($event)">
      </side-menu>
    </ion-content>
  </ion-menu>
  <ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>
  `,
  directives: [SideMenuComponent]
})
export class ConferenceApp {

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
  currentUser$: Observable<UserModel>;
  logoutSub: Subscription;

  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) private nav: Nav;

  constructor(private authStoreService: AuthStoreService,
              private platform: Platform) {
    // Call any initial plugins when ready
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();

      this.currentUser$ = this.authStoreService.getCurrentUser();
      this.logoutSub = this.authStoreService.logout()
        .subscribe(s => this.nav.setRoot(LoginPage));
    });
  }

  openPage(page: PageObj): void {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, {tabIndex: page.index});
    } else {
      this.nav.setRoot(page.component);
    }
    if (page.title === 'Logout') {
      this.authStoreService.dispatchLogout();
    }
  }

  ngOnDestroy() {
    this.logoutSub.unsubscribe();
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
  provide(JwtHelper, {useFactory: () => new JwtHelper()}),
  provide(Storage, {useFactory: () => new Storage(LocalStorage)}),
  provideStore(reducers),
  runEffects(effects),
  actions,
  provide(JwtAuthHttp, {
    useFactory: (http, authActions, store) => {
      return new JwtAuthHttp(new AuthConfig({noJwtError: true}), http, authActions, store);
    },
    deps: [Http, AuthActions, Store]
  }),
]);
