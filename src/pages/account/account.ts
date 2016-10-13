/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Component } from '@angular/core';
import { UserModel } from '../../core/providers/auth/user.model';
import { AuthService } from '../../core/services/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-account',
  template: `
  <ion-header>
    <ion-navbar>
      <button ion-button menuToggle>
        <ion-icon name="menu"></ion-icon>
      </button>
      <ion-title>Account</ion-title>
    </ion-navbar>
  </ion-header>
  <ion-content class="outer-content">
    <profile [profile]="profile$ | async"
             (logout)="logout()"
             (changePassword)="changePassword()"
             (updatePicture)="updatePicture()">
    </profile>
  </ion-content>
  `
})
export class AccountPage {
  profile$: Observable<UserModel>;

  constructor(private authStoreService: AuthService) {
    this.profile$ = this.authStoreService.getCurrentUser();
  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  changePassword() {
    console.log('Clicked to change password');
  }

  logout() {
    this.authStoreService.dispatchLogout();
  }
}
