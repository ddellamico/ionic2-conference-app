/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { ActionReducer, Action } from '@ngrx/store';
import { SpeakerState } from './speaker.state';
import { SpeakerActions } from '../../actions/speaker.action';
import { SpeakerModel } from '../../../core/providers/speakers/speaker.model';

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

    default:
      return state;
  }
};
