import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { UserModel } from '../../core/providers/auth/user-model';

@Component({
  selector: 'side-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ion-list *ngIf="currentUser !== null">
      <ion-list-header>
        Navigate
      </ion-list-header>
      <button ion-item menuClose *ngFor="let p of appPages" (click)="openPage.emit(p)">
        <ion-icon item-left [name]="p.icon"></ion-icon>
        {{p.title}}
      </button>
    </ion-list>
    <ion-list *ngIf="currentUser === null">
      <ion-list-header>
        Account
      </ion-list-header>
      <button ion-item menuClose *ngFor="let p of loggedOutPages" (click)="openPage.emit(p)">
        <ion-icon item-left [name]="p.icon"></ion-icon>
        {{p.title}}
      </button>
    </ion-list>
    <ion-list *ngIf="currentUser !== null">
      <ion-list-header>
        Account
      </ion-list-header>
      <button ion-item menuClose *ngFor="let p of loggedInPages" (click)="openPage.emit(p)">
        <ion-icon item-left [name]="p.icon"></ion-icon>
        {{p.title}}
      </button>
    </ion-list>
  `
})

export class SideMenuComponent {

  @Input() currentUser: UserModel;
  @Input() appPages: PageObj[];
  @Input() loggedOutPages: PageObj[];
  @Input() loggedInPages: PageObj[];

  @Output() openPage = new EventEmitter();

  constructor() {
  }
}
