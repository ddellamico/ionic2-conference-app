import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { ConferenceService } from '../../core/providers/conference/conference-service';

@Component({
  template: require('./schedule-filter.html')
})
export class ScheduleFilterPage {
  tracks: Array<{name: string, isChecked: boolean}> = [];

  constructor(private conferenceService: ConferenceService,
              private navParams: NavParams,
              private viewCtrl: ViewController) {
  }

  ngAfterViewInit() {
    this.getTracks();
  }

  getTracks() {
    // passed in array of track names that should be excluded (unchecked)
    const excludedTrackNames = this.navParams.data;
    this.conferenceService.getTracks()
      .subscribe((trackNames: Array<string>) => {
          trackNames.forEach(trackName => {
            this.tracks.push({
              name: trackName,
              isChecked: (excludedTrackNames.indexOf(trackName) === -1)
            });
          });
        },
        error => console.log(error),
        () => console.log(JSON.stringify(this.tracks))
      );
  }

  resetFilters() {
    // reset all of the toggles to be checked
    this.tracks.forEach(track => {
      track.isChecked = true;
    });
  }

  applyFilters() {
    // Pass back a new array of track names to exclude
    let excludedTrackNames = this.tracks.filter(c => !c.isChecked).map(c => c.name);
    this.dismiss(excludedTrackNames);
  }

  dismiss(data) {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    this.viewCtrl.dismiss(data);
  }
}
