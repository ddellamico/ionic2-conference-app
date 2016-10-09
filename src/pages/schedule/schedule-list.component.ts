/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Component, Input, Output, ViewChild, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { List } from 'ionic-angular';
import moment from 'moment';

import { ScheduleModel } from '../../core/providers/schedule/schedule.model';
import { TimelineFilter } from '../../core/providers/conference/timeline-filter.model';

@Component({
    selector: 'schedule-list',
    /*
     with 'onpush' change detection, components which rely solely on
     input can skip change detection until those input references change,
     this can supply a significant performance boost
     */
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <ion-list #scheduleList *ngIf="model.shownSessions > 0">
      <ion-item-group *ngFor="let group of model.groups" [hidden]="group.hide">
      <ion-item-divider sticky>\
        <div item-left>
          {{group.time}}
        </div>
        <div item-right>
          {{ getConfDate(model.date) }}
        </div>
      </ion-item-divider>
      <ion-item-sliding *ngFor="let session of group.sessions" #slidingItem 
                        [attr.track]="session.tracks[0] | lowercase" 
                        [hidden]="session.hide">
        <button ion-item (click)="goToSessionDetail.emit(session)">
          <h3>{{session.name}}</h3>
          <p>
            {{session.timeStart}} &mdash;
            {{session.timeEnd}}:
            {{session.location}}
          </p>
        </button>
        <ion-item-options>
          <button favorite (click)="addFavorite.emit({slidingItem: slidingItem, session: session })" 
                  *ngIf="filter.segment === 'all'">
            Favorite
          </button>
          <button danger 
                (click)="removeFavorite.emit({slidingItem: slidingItem, session: session, title: 'Remove Favorite'})" 
                 *ngIf="filter.segment === 'favorites'">
            Remove
          </button>
        </ion-item-options>
      </ion-item-sliding>
    </ion-item-group>
    </ion-list>
    `
  }
)
export class ScheduleListComponent {
  @Input() model: ScheduleModel;
  @Input() filter: TimelineFilter;

  @Output() addFavorite = new EventEmitter(false);
  @Output() removeFavorite = new EventEmitter(false);
  @Output() goToSessionDetail = new EventEmitter(false);

  // the list is a child of the schedule page
  // @ViewChild('scheduleList') gets a reference to the list
  // with the variable #scheduleList, `read: List` tells it to return
  // the List and not a reference to the element
  @ViewChild('scheduleList', {read: List}) scheduleList: List;

  constructor() {
  }

  getConfDate(confDate: Date): string {
    return moment(confDate).format('MM/DD/YYYY');
  }

  ngAfterViewInit() {
    // Close any open sliding items when the schedule updates
    if (this.scheduleList) {
      this.scheduleList.closeSlidingItems();
    }
  }
}

