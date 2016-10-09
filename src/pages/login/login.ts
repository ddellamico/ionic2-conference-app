/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

// Reference https://scotch.io/tutorials/using-angular-2s-model-driven-forms-with-formgroup-and-formcontrol

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { SignupPage } from '../signup/signup';
import { NotificationHelper } from '../../core/helpers/notifications';
import { AuthService } from '../../core/services/auth.service';
import { UxMessage } from '../../core/constants';

@Component({
  selector: 'page-login',
  template: `
  <ion-header>
    <ion-navbar>
      <button ion-button menuToggle>
        <ion-icon name="menu"></ion-icon>
      </button>
      <ion-title>Login</ion-title>
    </ion-navbar>
  </ion-header>
  <ion-content>
    <ion-list>
      <div class="logo">
        <img src="assets/img/appicon.svg">
      </div>
      <loading [present]="isFetching$ | async"></loading>
      <auth-form [errorMessage]="error$ | async"
                 (onLogin)="onLogin($event)"
                 (onSignup)="onSignup($event)">
      </auth-form>
    </ion-list>
  </ion-content>
  `
})
export class LoginPage {

  private loggedIn$: Observable<boolean>;
  private isFetching$: Observable<boolean>;
  private error$: Observable<string>;

  private submitted = false;

  constructor(private authStoreService: AuthService,
              private nav: NavController,
              private notification: NotificationHelper) {
  }

  ngOnInit() {
    this.isFetching$ = this.authStoreService.isLoading();
    this.error$ = this.authStoreService.getErrorMessage();
    this.loggedIn$ = this.authStoreService.loggedIn();
  }

  onLogin({credentials, isValid}) {
    if (!isValid) {
      this.notification.showAlert(UxMessage.INVALID_CREDENTIALS);
      return;
    }
    const {username, password} = credentials;
    this.authStoreService.dispachAuth(username, password);
    this.submitted = true;
  }

  onSignup() {
    this.nav.push(SignupPage);
  }
}
