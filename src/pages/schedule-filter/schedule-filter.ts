import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NavParams, ViewController } from 'ionic-angular';
import { ScheduleService } from '../../core/services/schedule.service';

@Component({
  selector: 'page-schedule-filter',
  template: `
    <track-list
      [tracks]="tracks$ | async"
      (applyFilters)="applyFilters($event)"
      (dismiss)="dismiss($event)"
      (resetFilters)="resetFilters()">
    </track-list>
  `
})
export class ScheduleFilterPage {

  tracks$: Observable<Array<{name: string, isChecked: boolean}>>;

  constructor(private scheduleStoreService: ScheduleService,
              private navParams: NavParams,
              private viewCtrl: ViewController) {

    // passed in array of track names that should be excluded (unchecked)
    const excludedTrackNames = this.navParams.data;
    this.tracks$ = this.scheduleStoreService.getTrackers(excludedTrackNames);
  }

  ionViewDidEnter() {
    this.getTracks();
  }

  getTracks() {
    this.scheduleStoreService.dispatchloadTracks();
  }

  resetFilters() {
    this.tracks$ = this.scheduleStoreService.getTrackers([]);
  }

  applyFilters(tracks) {
    const excludedTrackNames = tracks.filter(c => !c.isChecked).map(c => c.name);
    this.dismiss(excludedTrackNames);
  }

  dismiss(data) {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    this.viewCtrl.dismiss(data);
  }
}
