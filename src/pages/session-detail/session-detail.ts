import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-session-detail',
  template: `
  <ion-header>
    <ion-navbar>
      <ion-title>Session</ion-title>
    </ion-navbar>
  </ion-header>
  <ion-content padding>
    <h1>{{session.name}}</h1>
    <h4 *ngFor="let speaker of session.speakers">
      {{speaker.name}}
    </h4>
    <p>
      {{session.timeStart}} - {{session.timeEnd}}
    </p>
    <p>{{session.location}}</p>
    <p>{{session.description}}</p>
  </ion-content>
  `
})
export class SessionDetailPage {
  session: any;

  constructor(private navParams: NavParams) {
    this.session = navParams.data;
  }
}
