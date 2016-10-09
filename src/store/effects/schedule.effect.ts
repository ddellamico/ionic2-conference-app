/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Injectable } from '@angular/core';
import { Effect, toPayload, Actions } from '@ngrx/effects';
import { ScheduleActions } from '../actions/schedule.action';
import { ConferenceProvider } from '../../core/providers/conference/conference.provider';
import { TimelineFilter } from '../../core/providers/conference/timeline-filter.model';
import { ScheduleModel } from '../../core/providers/schedule/schedule.model';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ScheduleEffect {

  constructor(private actions$: Actions,
              private scheduleActions: ScheduleActions,
              private conferenceService: ConferenceProvider) {
  }

  @Effect()
  loadCollection$: Observable<Action> = this.actions$
    .ofType(ScheduleActions.LOAD_COLLECTION)
    .map<TimelineFilter>(toPayload)
    .switchMap((filter) => this.conferenceService.getTimeline(filter))
    .map((schedules: ScheduleModel) => this.scheduleActions.loadCollectionSuccess(schedules));

  @Effect()
  loadTracks$: Observable<Action> = this.actions$
    .ofType(ScheduleActions.LOAD_TRACKS)
    .switchMap(() => this.conferenceService.getTracks())
    .map((tracks: Array<string>) => this.scheduleActions.loadTracksSuccess(tracks));
}
