import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SessionDetailPage } from '../session-detail/session-detail';
import { SpeakerModel } from '../../core/providers/speakers/speaker-model';

@Component({
  template: require('./speaker-detail.html')
})
export class SpeakerDetailPage {
  speaker: SpeakerModel;

  constructor(private nav: NavController, private navParams: NavParams) {
    this.speaker = (this.navParams.data as SpeakerModel);
  }

  goToSessionDetail(session) {
    this.nav.push(SessionDetailPage, session);
  }
}
