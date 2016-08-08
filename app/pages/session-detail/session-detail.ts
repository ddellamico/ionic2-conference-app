import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';


@Component({
  template: require('./session-detail.html')
})
export class SessionDetailPage {
  session: any;

  constructor(private navParams: NavParams) {
    this.session = navParams.data;
  }
}
