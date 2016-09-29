/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */


import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ScheduleActions } from '../../store/actions/schedule-action';
import { AppState } from '../../store/reducers/index';
import { ScheduleSelector } from '../../store/selectors/schedule-selector';
import { ScheduleModel } from '../providers/schedule/schedule-model';
import { TimelineFilter } from '../providers/conference/timeline-filter-model';

@Injectable()
export class ScheduleStoreService {

  constructor(private store: Store<AppState>,
              private scheduleActions: ScheduleActions) {
  }

  public dispatchLoadCollection(filter: TimelineFilter): void {
    this.store.dispatch(
      this.scheduleActions.loadCollection(filter)
    );
  }

  public dispatchloadTracks(): void {
    this.store.dispatch(
      this.scheduleActions.loadTracks()
    );
  }

  public isLoading(): Observable<boolean> {
    return this.store.let(ScheduleSelector.isLoading());
  }

  public getSchedule(): Observable<ScheduleModel> {
    return this.store.let(ScheduleSelector.getSchedule());
  }

  public getTrackers(excludedTrackNames: Array<string>): Observable<Array<{name: string, isChecked: boolean}>> {
    return this.store.let(ScheduleSelector.getTrackers(excludedTrackNames));
  }
}
