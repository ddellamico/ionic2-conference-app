/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserModel } from '../../core/providers/auth/user.model';

@Component({
  selector: 'profile',
  template: `
  <div padding-top text-center *ngIf="profile">
    <img src="http://www.gravatar.com/avatar?d=mm&s=140">
    <h2>{{profile.username}}</h2>

    <ion-list inset>
      <button ion-item (click)="updatePicture.emit()">Update Picture</button>
      <button ion-item (click)="changePassword.emit()">Change Password</button>
      <button ion-item (click)="logout.emit()">Logout</button>
    </ion-list>
  </div>
  `
})

export class ProfileComponent {

  @Input() profile: UserModel;
  @Output() updatePicture = new EventEmitter();
  @Output() changePassword = new EventEmitter();
  @Output() logout = new EventEmitter();

  constructor() {
  }
}
