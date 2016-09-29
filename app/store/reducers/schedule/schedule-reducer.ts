/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { ActionReducer, Action } from '@ngrx/store';
import { ScheduleState } from './schedule-state';
import { ScheduleActions } from '../../actions/schedule-action';
import { ScheduleModel } from '../../../core/providers/schedule/schedule-model';

const defaultState: ScheduleState = {
  loaded: false,
  loading: false,
  scheduleModel: new ScheduleModel(null),
  tracks: []
};

export const scheduleReducer: ActionReducer<ScheduleState> = (state: ScheduleState = defaultState, action: Action) => {
  switch (action.type) {
    case ScheduleActions.LOAD_TRACKS, ScheduleActions.LOAD_COLLECTION: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case ScheduleActions.LOAD_COLLECTION_SUCCESS: {
      const schedule: ScheduleModel = action.payload;
      return Object.assign({}, state, {
        loading: false,
        scheduleModel: schedule
      });
    }

    case ScheduleActions.LOAD_TRACKS_SUCCESS : {
      const tracks: Array<string> = action.payload;
      return Object.assign({}, state, {
        loading: false,
        tracks: tracks
      });
    }

    default:
      return state;
  }
};
