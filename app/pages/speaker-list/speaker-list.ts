/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';
import { SpeakerDetailPage } from '../speaker-detail/speaker-detail';
import { SessionDetailPage } from '../session-detail/session-detail';
import { SpeakerModel } from '../../core/providers/speakers/speaker-model';
import { ConferenceService } from '../../core/providers/conference/conference-service';

@Component({
  template: require('./speaker-list.html')
})
export class SpeakerListPage {
  speakers: Array<SpeakerModel> = [];

  constructor(private nav: NavController, private actionSheet: ActionSheetController,
              private conferenceService: ConferenceService) {
  }

  ionViewDidEnter() {
    this.loadSpeakers();
  }

  loadSpeakers() {
    return this.conferenceService.getSpeakers()
      .subscribe(speakers => {
        this.speakers = speakers;
      }), error => console.log(error);
  }

  goToSessionDetail(session) {
    this.nav.push(SessionDetailPage, session);
  }

  goToSpeakerDetail(speakerName: string) {
    this.nav.push(SpeakerDetailPage, speakerName);
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
