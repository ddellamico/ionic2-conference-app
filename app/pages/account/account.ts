/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Component } from '@angular/core';
import { UserModel } from '../../core/providers/auth/user-model';
import { AuthStoreService } from '../../core/store/auth-store.service';
import { Observable } from 'rxjs/Observable';
import { ProfileComponent } from './profile.component';

@Component({
  template: `
  <ion-header>
    <ion-navbar>
      <button menuToggle>
        <ion-icon name="menu"></ion-icon>
      </button>
      <ion-title>Account</ion-title>
    </ion-navbar>
  </ion-header>
  <ion-content class="outer-content">
    <profile [profile]="profile$ | async"
             (logout)="logout($event)"
             (changePassword)="changePassword($event)"
             (updatePicture)="updatePicture($event)">
    </profile>
  </ion-content>
  `,
  directives: [ProfileComponent]
})
export class AccountPage {
  private profile$: Observable<UserModel>;

  constructor(private authStoreService: AuthStoreService) {
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
