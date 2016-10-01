import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { App, ModalController, AlertController, NavController } from 'ionic-angular';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { SessionDetailPage } from '../session-detail/session-detail';
import { UserModel } from '../../core/providers/auth/user.model';
import { TimelineFilter } from '../../core/providers/conference/timeline-filter.model';
import { ScheduleModel } from '../../core/providers/schedule/schedule.model';
import { SessionModel } from '../../core/providers/schedule/session.model';
import { ScheduleListComponent } from './schedule-list.component';
import { ScheduleService } from '../../core/services/schedule.service';

@Component({
  template: `
  <ion-header>
    <ion-navbar no-border-bottom>
      <button menuToggle>
        <ion-icon name="menu"></ion-icon>
      </button>
      <ion-segment [(ngModel)]="filter.segment" (ionChange)="updateSchedule()">
        <ion-segment-button value="all">
          All
        </ion-segment-button>
        <ion-segment-button value="favorites">
          Favorites
        </ion-segment-button>
      </ion-segment>
      <ion-buttons end>
        <button (click)="presentFilter()">
          <ion-icon ios="ios-options-outline" md="md-options"></ion-icon>
        </button>
      </ion-buttons>
    </ion-navbar>
    <ion-toolbar no-border-top>
      <ion-searchbar primary [(ngModel)]="filter.queryText" (ionInput)="updateSchedule()" placeholder="Search">
      </ion-searchbar>
    </ion-toolbar>
  </ion-header>
  <ion-content class="schedule">
    <schedule-list [model]="model$ | async" [filter]="filter" (addFavorite)="addFavorite($event)"
      (removeFavorite)="removeFavorite($event)"
      (goToSessionDetail)="goToSessionDetail($event)">
    </schedule-list>
    <ion-list-header [hidden]="shownSessions > 0">
      No Sessions Found
    </ion-list-header>
  </ion-content>
  `,
  directives: [ScheduleListComponent]
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
              private scheduleStoreService: ScheduleService,
              private nav: NavController,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController) {

    this.model$ = this.scheduleStoreService.getSchedule();
    this.isFetching$ = this.scheduleStoreService.isLoading();
  }

  ionViewDidEnter() {
    this.app.setTitle('Schedule');
    this.updateSchedule();
  }

  updateSchedule() {
    this.scheduleStoreService.dispatchLoadCollection(this.filter);
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
