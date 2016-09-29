/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';
import { Observable } from 'rxjs/Observable';

import { SpeakerDetailPage } from '../speaker-detail/speaker-detail';
import { SessionDetailPage } from '../session-detail/session-detail';
import { SpeakerModel } from '../../core/providers/speakers/speaker-model';
import { SpeakerListComponent } from './speaker-list.component';
import { SpeakerStoreService } from '../../core/store/speaker-store.service';

@Component({
  template: `
    <ion-header>
      <ion-navbar>
        <button menuToggle>
          <ion-icon name="menu"></ion-icon>
        </button>
        <ion-title>Speakers</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content class="outer-content speaker-list">
      <speaker-list
        [speakers]="speakerList$ | async"
        (goToSessionDetail)="goToSessionDetail($event)"
        (goToSpeakerDetail)="goToSpeakerDetail($event)"
        (openSpeakerShare)="openSpeakerShare($event)"
        (goToSpeakerTwitter)="goToSpeakerTwitter($event)">
      </speaker-list>
    </ion-content>
  `,
  directives: [SpeakerListComponent]
})
export class SpeakerListPage {
  public speakerList$: Observable<SpeakerModel[]>;
  public isFetching$: Observable<boolean>;

  constructor(private nav: NavController,
              private speakerStoreService: SpeakerStoreService,
              private actionSheet: ActionSheetController) {

    this.speakerList$ = this.speakerStoreService.getSpeakerItems();
    this.isFetching$ = this.speakerStoreService.isLoading();
  }

  ionViewDidEnter() {
    this.speakerStoreService.dispatchLoadCollection();
  }

  goToSessionDetail(session) {
    this.nav.push(SessionDetailPage, session);
  }

  goToSpeakerDetail(speaker: SpeakerModel) {
    this.nav.push(SpeakerDetailPage, speaker);
  }

  goToSpeakerTwitter(speaker) {
    new InAppBrowser(`https://twitter.com/${speaker.twitter}`, '_system');
  }

  openSpeakerShare(speaker) {
    let actionSheet = this.actionSheet.create({
      title: 'Share ' + speaker.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: () => {
            console.log('Copy link clicked on https://twitter.com/' + speaker.twitter);
            if (window['cordova'] && window['cordova'].plugins.clipboard) {
              window['cordova'].plugins.clipboard.copy('https://twitter.com/' + speaker.twitter);
            }
          }
        },
        {
          text: 'Share via ...',
          handler: () => {
            console.log('Share via clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }
}
