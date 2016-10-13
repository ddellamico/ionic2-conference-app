/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Nav, Platform } from 'ionic-angular';
import { AccountPage, LoginPage, SignupPage, TabsPage, TutorialPage } from '../pages';
import { UserModel } from '../core/providers/auth/user.model';
import { AuthService } from '../core/services/auth.service';

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
    <ion-nav #content swipeBackEnabled="false"></ion-nav>
    `
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

  currentUser$: Observable<UserModel>;
  isFetching$: Observable<boolean>;

  private logoutSub: Subscription;
  private loginSub: Subscription;


  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  constructor(private authService: AuthService,
              private platform: Platform) {
  }

  ngOnInit() {
    let _rootPage: any = TutorialPage; // at the start it shows the tutorial page

    this.currentUser$ = this.authService.getCurrentUser();
    this.isFetching$ = this.authService.isLoading();

    this.authService.dispatchCheckToken();
    this.loginSub = this.authService.loggedIn().subscribe((isLoggedIn) => {
      isLoggedIn ? this.nav.push(TabsPage) : this.nav.setRoot(_rootPage);
      _rootPage = LoginPage; //
    });

    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      // StatusBar.styleDefault();
      // Splashscreen.hide();
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
      this.authService.dispatchLogout();
    }
  }

  ngOnDestroy() {
    this.logoutSub.unsubscribe();
    this.loginSub.unsubscribe();
  }
}
