/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { ActionReducer, Action } from '@ngrx/store';
import { SpeakerState } from './speaker-state';
import { SpeakerModel } from '../../providers/speakers/speaker-model';
import { SpeakerActions } from '../../actions/speaker-action';

const defaultState: SpeakerState = {
  loaded: false,
  loading: false,
  speakerList: []
};

export const speakerReducer: ActionReducer<SpeakerState> = (state: SpeakerState = defaultState, action: Action) => {
  switch (action.type) {
    case SpeakerActions.LOAD_COLLECTION: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case SpeakerActions.LOAD_COLLECTION_SUCCESS: {
      const speakers: SpeakerModel[] = action.payload;
      return Object.assign({}, state, {
        loading: false,
        speakerList: speakers
      });
    }

    case SpeakerActions.ADD_SPEAKER: {
      return Object.assign({}, state, {
        speakerList: [...state.speakerList, new SpeakerModel(action.payload.id,
          action.payload.name, [], 'twt', 'ff')]
      });
    }

    case SpeakerActions.REMOVE_SPEAKER:
      return Object.assign({}, state, {
        speakerList: state.speakerList
          .filter(s => s._id !== action.payload)
      });

    default:
      return state;
  }
};
