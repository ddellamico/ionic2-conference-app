/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Observable } from 'rxjs/Observable';
import { NotificationService } from '../../core/helpers/notifications';
import { UxMessage } from '../../core/constants/ux-message';
import { SignUpFormComponent } from './form.component';
import { AuthService } from '../../core/services/auth.service';
import { SignupModel } from '../../core/providers/auth/signup.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  template: `
  <ion-header>
    <ion-navbar>
      <button menuToggle>
        <ion-icon name="menu"></ion-icon>
      </button>
      <ion-title>Signup</ion-title>
    </ion-navbar>
  </ion-header>
  <ion-content class="login-page">
    <signup-form (onSignup)="onSignup($event)"></signup-form>
  </ion-content>
  `,
  directives: [SignUpFormComponent]
})
export class SignupPage {

  private errSub: Subscription;
  private signupSub: Subscription;
  private isFetching$: Observable<boolean>;
  private error$: Observable<string>;

  constructor(private authStoreService: AuthService,
              private nav: NavController,
              private notification: NotificationService) {

    this.error$ = this.authStoreService.getErrorMessage();
    this.isFetching$ = this.authStoreService.isLoading();

    this.errSub = this.error$.subscribe((err: any) => {
      if (err) {
        this.notification.showAlert(UxMessage.SIGNUP_ERROR);
        console.log(err);
      }
    });

    this.signupSub = this.authStoreService.signedOut()
      .subscribe(s => this.nav.setRoot(TabsPage),
        err => {
          this.notification.showAlert(UxMessage.UNKNOWN_ERROR);
          console.log(err);
        }
      );
  }

  onSignup({data, isValid}) {
    if (!isValid) {
      this.notification.showAlert(UxMessage.SIGNUP_ERROR);
      return;
    }

    this.authStoreService.dispachSignin(new SignupModel(data.firstName, data.lastName,
      data.username, data.password));
  }

  ngOnDestroy() {
    this.errSub.unsubscribe();
    this.signupSub.unsubscribe();
  }
}
