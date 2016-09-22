/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { SpeakerDetailPage } from '../speaker-detail/speaker-detail';
import { SessionDetailPage } from '../session-detail/session-detail';
import { SpeakerModel } from '../../core/providers/speakers/speaker-model';
import { SpeakerListComponent } from '../../components/speaker-list/speaker-list';
import { UtilService } from '../../core/helpers/utils';
import { AppState } from '../../core/reducers/index';
import { SpeakerSelector } from '../../core/selectors/speaker-selector';
import { SpeakerActions } from '../../core/actions/speaker-action';

@Component({
  template: require('./speaker-list.html'),
  directives: [SpeakerListComponent]
})
export class SpeakerListPage {
  public speakerList$: Observable<SpeakerModel[]>;
  public isFetching$: Observable<boolean>;

  constructor(private _store: Store<AppState>,
              private nav: NavController,
              private actionSheet: ActionSheetController,
              private speakerActions: SpeakerActions) {

    this.speakerList$ = this._store.let(SpeakerSelector.getSpeakerItems());
    this.isFetching$ = this._store.let(SpeakerSelector.isLoading());

  }

  ionViewDidEnter() {
    // dispatch load action to store
    this._store.dispatch(
      this.speakerActions.loadCollection()
    );
  }

  removeSpeaker(id) {
    this._store.dispatch({type: SpeakerActions.REMOVE_SPEAKER, payload: id});
  }

  goToSessionDetail(session) {
    this.nav.push(SessionDetailPage, session);
  }

  goToSpeakerDetail(speaker: SpeakerModel) {
    this.nav.push(SpeakerDetailPage, speaker);
  }

  addSpeaker() {
    this._store.dispatch({
      type: SpeakerActions.ADD_SPEAKER,
      payload: {
        id: UtilService.uid(),
        name: 'pippone123'
      }
    });
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
