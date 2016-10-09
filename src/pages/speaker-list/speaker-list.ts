import { Component } from '@angular/core';
import { NavController, ActionSheetController, Config } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';
import { Observable } from 'rxjs/Observable';

import { SpeakerDetailPage } from '../speaker-detail/speaker-detail';
import { SessionDetailPage } from '../session-detail/session-detail';
import { SpeakerModel } from '../../core/providers/speakers/speaker.model';
import { SpeakerService } from '../../core/services/speaker.service';

@Component({
  selector: 'page-speaker-list',
  template: `
    <ion-header>
      <ion-navbar>
        <button ion-button menuToggle>
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
        (openContact)="openContact($event)"
        (goToSpeakerTwitter)="goToSpeakerTwitter($event)">
      </speaker-list>
    </ion-content>
  `
})
export class SpeakerListPage {
  public speakerList$: Observable<SpeakerModel[]>;
  public isFetching$: Observable<boolean>;

  constructor(private nav: NavController,
              private speakerService: SpeakerService,
              private config: Config,
              private actionSheetCtrl: ActionSheetController) {

    this.speakerList$ = this.speakerService.getSpeakerItems();
    this.isFetching$ = this.speakerService.isLoading();
  }

  ionViewDidEnter() {
    this.speakerService.dispatchLoadCollection();
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

  openSpeakerShare(speaker: SpeakerModel) {
    const actionSheet = this.actionSheetCtrl.create({
      title: `Share ${speaker.name}`,
      buttons: [
        {
          text: 'Copy Link',
          handler: () => {
            console.log(`Copy link clicked on https://twitter.com/${speaker.twitter}`);
            if (window['cordova'] && window['cordova'].plugins.clipboard) {
              window['cordova'].plugins.clipboard.copy(`https://twitter.com/${speaker.twitter}`);
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

  openContact(speaker: SpeakerModel) {
    let mode = this.config.get('mode');

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Contact with ' + speaker.name,
      buttons: [
        {
          text: `Email ( ${speaker.email} )`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + speaker.email);
          }
        },
        {
          text: `Call ( ${speaker.phone} )`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel:' + speaker.phone);
          }
        }
      ]
    });

    actionSheet.present();
  }
}
