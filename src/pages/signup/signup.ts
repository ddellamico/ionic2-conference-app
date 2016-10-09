/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NotificationHelper } from '../../core/helpers/notifications';
import { AuthService } from '../../core/services/auth.service';
import { SignupModel } from '../../core/providers/auth/signup.model';
import { Subscription } from 'rxjs/Subscription';
import { UxMessage } from '../../core/constants';

@Component({
  selector: 'page-signup',
  template: `
  <ion-header>
    <ion-navbar>
      <button ion-button menuToggle>
        <ion-icon name="menu"></ion-icon>
      </button>
      <ion-title>Signup</ion-title>
    </ion-navbar>
  </ion-header>
  <ion-content>
    <signup-form (onSignup)="onSignup($event)"></signup-form>
  </ion-content>
  `
})
export class SignupPage {

  private errSub: Subscription;
  private isFetching$: Observable<boolean>;
  private error$: Observable<string>;

  constructor(private authStoreService: AuthService,
              private notification: NotificationHelper) {

    this.error$ = this.authStoreService.getErrorMessage();
    this.isFetching$ = this.authStoreService.isLoading();

    this.errSub = this.error$.subscribe((err: any) => {
      if (err) {
        this.notification.showAlert(UxMessage.SIGNUP_ERROR);
        console.log(err);
      }
    });
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
  }
}
