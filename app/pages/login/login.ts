/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

// Reference https://scotch.io/tutorials/using-angular-2s-model-driven-forms-with-formgroup-and-formcontrol

import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { NotificationService } from '../../core/helpers/notifications';
import { UxMessage } from '../../core/constants/ux-message';
import { AppState } from '../../core/reducers/index';
import { AuthSelector } from '../../core/selectors/auth-selector';
import { AuthActions } from '../../core/actions/auth-action';
import { AuthFormComponent } from './auth-form.component';
import { BasePage } from '../base-page';
import { LoadingComponent } from '../../components/loading/loading.component';

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
  directives: [AuthFormComponent, LoadingComponent]
})
export class LoginPage extends BasePage {

  private loggedIn$: Observable<boolean>;
  private isFetching$: Observable<boolean>;
  private error$: Observable<string>;

  private subscription: Subscription;
  private submitted = false;

  constructor(private store: Store<AppState>,
              private authActions: AuthActions,
              private nav: NavController,
              private notification: NotificationService,
              protected alertCtrl: AlertController) {

    super(alertCtrl);

    this.isFetching$ = this.store.let(AuthSelector.isLoading());
    this.error$ = this.store.let(AuthSelector.getErrorMessage());
    this.loggedIn$ = this.store.let(AuthSelector.isLoggedIn());

    this.subscription = this.loggedIn$
      .subscribe(loggedIn => {
        if (!this.submitted) return;
        if (loggedIn) {
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

    this.store.dispatch(
      this.authActions.auth(username, password)
    );
    this.submitted = true;
  }

  onSignup() {
    this.nav.push(SignupPage);
  }

  ngOnDestroy() {
    // always remember to unsubscribe in ngOnDestroy
    this.subscription.unsubscribe();
  }
}
