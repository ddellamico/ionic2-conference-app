/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { ScheduleModel } from '../providers/schedule/schedule-model';
import { TimelineFilter } from '../providers/conference/timeline-filter-model';

/**
 * Instead of passing around action string constants and manually recreating
 * action objects at the point of dispatch, we create services encapsulating
 * each appropriate action group. Action types are included as static
 * members and kept next to their action creator. This promotes a
 * uniform interface and single import for appropriate actions
 * within your application components.
 */
@Injectable()
export class ScheduleActions {

  static LOAD_COLLECTION = '[Schedule] Load Collection';

  loadCollection(filter: TimelineFilter): Action {
    return {
      type: ScheduleActions.LOAD_COLLECTION,
      payload: filter
    };
  }

  static LOAD_COLLECTION_SUCCESS = '[Schedule] Load Collection Success';

  loadCollectionSuccess(schedule: ScheduleModel): Action {
    return {
      type: ScheduleActions.LOAD_COLLECTION_SUCCESS,
      payload: schedule
    };
  }

  static LOAD_TRACKS = '[Schedule] Load Tracks';

  loadTracks(): Action {
    return {
      type: ScheduleActions.LOAD_TRACKS
    };
  }

  static LOAD_TRACKS_SUCCESS = '[Schedule] Load Tracks Success';

  loadTracksSuccess(tracks: Array<string>): Action {
    return {
      type: ScheduleActions.LOAD_TRACKS_SUCCESS,
      payload: tracks
    };
  }

}
