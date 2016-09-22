import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { App, ModalController, AlertController, NavController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/reducers/index';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { SessionDetailPage } from '../session-detail/session-detail';
import { UserModel } from '../../core/providers/auth/user-model';
import { ScheduleComponent } from '../../components/schedule/schedule';
import { TimelineFilter } from '../../core/providers/conference/timeline-filter-model';
import { ScheduleActions } from '../../core/actions/schedule-action';
import { ScheduleModel } from '../../core/providers/schedule/schedule-model';
import { ScheduleSelector } from '../../core/selectors/schedule-selector';
import { SessionModel } from '../../core/providers/schedule/session-model';

@Component({
  template: require('./schedule.html'),
  directives: [ScheduleComponent]
})
export class SchedulePage {

  private filter: TimelineFilter = {
    dayIndex: 0,
    queryText: '',
    excludeTracks: [],
    segment: 'all'
  };

  private model$: Observable<ScheduleModel>;
  private isFetching$: Observable<boolean>;

  constructor(private app: App,
              private store: Store<AppState>,
              private nav: NavController,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController,
              private scheduleActions: ScheduleActions) {

    this.model$ = this.store.let(ScheduleSelector.getSchedule());
    this.isFetching$ = this.store.let(ScheduleSelector.isLoading());
  }

  ionViewDidEnter() {
    this.app.setTitle('Schedule');
    this.updateSchedule();
  }

  updateSchedule() {
    // dispatch load action to store
    this.store.dispatch(
      this.scheduleActions.loadCollection(this.filter)
    );
  }

  presentFilter() {
    const modal = this.modalCtrl.create(ScheduleFilterPage, this.filter.excludeTracks);
    modal.present();

    modal.onDidDismiss((data: any[]) => {
      if (data) {
        this.filter.excludeTracks = data;
        this.updateSchedule();
      }
    });
  }

  goToSessionDetail(sessionData: SessionModel) {
    this.nav.push(SessionDetailPage, sessionData);
  }

  addFavorite({slidingItem, session}) {
    if (UserModel.hasFavorite(session.name)) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      this.removeFavorite({
        slidingItem: slidingItem,
        session: session,
        title: 'Favorite already added'
      });
    } else {
      // remember this session as a user favorite
      UserModel.addFavorite(session.name);
      // create an alert instance
      const alert = this.alertCtrl.create({
        title: 'Favorite Added',
        buttons: [{
          text: 'OK',
          handler: () => {
            // close the sliding item
            slidingItem.close();
          }
        }]
      });
      // now present the alert on top of all other content
      alert.present();
    }
  }

  removeFavorite({slidingItem, session, title}) {
    const alert = this.alertCtrl.create({
      title: title,
      message: 'Would you like to remove this session from your favorites?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // they clicked the cancel button, do not remove the session
            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        },
        {
          text: 'Remove',
          handler: () => {
            // they want to remove this session from their favorites
            UserModel.removeFavorite(session.name);
            this.updateSchedule();

            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    alert.present();
  }
}
