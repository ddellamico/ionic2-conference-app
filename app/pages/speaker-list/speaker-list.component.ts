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
      <button (click)="goToSpeakerTwitter.emit(speaker)" clear item-left>
        <ion-icon name="logo-twitter"></ion-icon>
        Tweet
      </button>
      <button (click)="openSpeakerShare.emit(speaker)" clear item-right>
        <ion-icon name="share"></ion-icon>
        Share
      </button>
      <button (click)="removeSpeaker.emit(speaker._id)" clear item-right>
        <ion-icon name="remove"></ion-icon>
        Remove
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
  @Output() removeSpeaker = new EventEmitter();
  @Output() goToSessionDetail = new EventEmitter();
  @Output() goToSpeakerDetail = new EventEmitter();
  @Output() goToSpeakerTwitter = new EventEmitter();
  @Output() openSpeakerShare = new EventEmitter();

}
