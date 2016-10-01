/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

// Reference https://scotch.io/tutorials/using-angular-2s-model-driven-forms-with-formgroup-and-formcontrol

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { NotificationService } from '../../core/helpers/notifications';
import { UxMessage } from '../../core/constants/ux-message';
import { FormComponent } from './form.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { AuthService } from '../../core/services/auth.service';
import { UserModel } from '../../core/providers/auth/user.model';

@Component({
  template: `
  <ion-header>
    <ion-navbar>
      <button menuToggle>
        <ion-icon name="menu"></ion-icon>
      </button>
      <ion-title>Login</ion-title>
    </ion-navbar>
  </ion-header>
  <ion-content>
    <ion-list>
      <div class="logo">
        <img src="${require(`../../img/appicon.png`)}">
      </div>
      <loading [present]="isFetching$ | async"></loading>
      <auth-form [errorMessage]="error$ | async"
                 (onLogin)="onLogin($event)"
                 (onSignup)="onSignup($event)">
      </auth-form>
    </ion-list>
  </ion-content>
  `,
  directives: [FormComponent, LoadingComponent]
})
export class LoginPage {

  private currentUser$: Observable<UserModel>;
  private isFetching$: Observable<boolean>;
  private error$: Observable<string>;

  private authSub: Subscription;
  private submitted = false;

  constructor(private authStoreService: AuthService,
              private nav: NavController,
              private notification: NotificationService) {
  }

  ngOnInit() {
    this.isFetching$ = this.authStoreService.isLoading();
    this.error$ = this.authStoreService.getErrorMessage();
    this.currentUser$ = this.authStoreService.getCurrentUser();

    this.authSub = this.currentUser$.subscribe((user: UserModel) => {
      if (!this.submitted) return;
      if (user && user._id) {
        this.nav.push(TabsPage);
      } else {
        this.notification.showAlert(UxMessage.INVALID_CREDENTIALS);
      }
    });
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

  ngOnDestroy() {
    // always remember to unsubscribe in ngOnDestroy
    this.authSub.unsubscribe();
  }
}
