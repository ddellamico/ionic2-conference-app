/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'speaker-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <ion-card *ngFor="let speaker of speakers" class="speaker">
    <ion-card-header>
      <ion-item>
        <ion-avatar item-left>
          <img [src]="speaker.profilePic">
        </ion-avatar>
        {{speaker.name}}
        <button ion-button icon-only (click)="openContact.emit(speaker)" clear item-right>
          <ion-icon name="help-circle"></ion-icon>
        </button>
      </ion-item>
    </ion-card-header>
    <ion-card-content class="outer-content">
      <ion-list>
        <button ion-item *ngFor="let session of speaker.sessions" (click)="goToSessionDetail.emit(session)">
          <h3>{{session.name}}</h3>
        </button>
        <button ion-item (click)="goToSpeakerDetail.emit(speaker)">
          <h3>About {{speaker.name}}</h3>
        </button>
      </ion-list>
    </ion-card-content>
    <ion-item>
      <button ion-button icon-left ion-button icon-left (click)="goToSpeakerTwitter.emit(speaker)" clear item-left>
        <ion-icon name="logo-twitter"></ion-icon>
        Tweet
      </button>
      <button ion-button icon-left (click)="openSpeakerShare.emit(speaker)" clear item-right>
        <ion-icon name="share"></ion-icon>
        Share
      </button>
    </ion-item>
  </ion-card>
  `
})
export class SpeakerListComponent {
  /*
   "dumb" components do nothing but display data based on input and
   emit relevant events back up for parent, or "container" components to handle
   */
  @Input() speakers;
  @Output() goToSessionDetail = new EventEmitter(false);
  @Output() goToSpeakerDetail = new EventEmitter(false);
  @Output() goToSpeakerTwitter = new EventEmitter(false);
  @Output() openSpeakerShare = new EventEmitter(false);
  @Output() openContact = new EventEmitter(false);

}
