import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { NavParams, ViewController } from 'ionic-angular';
import { AppState } from '../../core/reducers/index';
import { ScheduleActions } from '../../core/actions/schedule-action';
import { ScheduleSelector } from '../../core/selectors/schedule-selector';
import { TrackListComponent } from './track-list.component';

@Component({
  template: `
    <track-list
      [tracks]="tracks$ | async"
      (applyFilters)="applyFilters($event)"
      (dismiss)="dismiss($event)"
      (resetFilters)="resetFilters($event)">
    </track-list>
  `,
  directives: [TrackListComponent]
})
export class ScheduleFilterPage {
  private tracks$: Observable<Array<{name: string, isChecked: boolean}>>;

  constructor(private store: Store<AppState>,
              private scheduleActions: ScheduleActions,
              private navParams: NavParams,
              private viewCtrl: ViewController) {

    // passed in array of track names that should be excluded (unchecked)
    const excludedTrackNames = this.navParams.data;
    this.tracks$ = this.store.let(ScheduleSelector.getTrackers(excludedTrackNames));
  }

  ionViewDidEnter() {
    this.getTracks();
  }

  getTracks() {
    this.store.dispatch(
      this.scheduleActions.loadTracks()
    );
  }

  resetFilters() {
    this.tracks$ = this.store.let(ScheduleSelector.getTrackers([]));
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
