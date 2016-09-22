/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { SpeakerModel } from '../providers/speakers/speaker-model';

/**
 * Instead of passing around action string constants and manually recreating
 * action objects at the point of dispatch, we create services encapsulating
 * each appropriate action group. Action types are included as static
 * members and kept next to their action creator. This promotes a
 * uniform interface and single import for appropriate actions
 * within your application components.
 */
@Injectable()
export class SpeakerActions {

  static ADD_SPEAKER = '[Speaker] Add Speaker';
  static REMOVE_SPEAKER = '[Speaker] Remove Speaker';

  static LOAD_COLLECTION = '[Speaker] Load Collection';

  loadCollection(): Action {
    return {
      type: SpeakerActions.LOAD_COLLECTION
    };
  }

  static LOAD_COLLECTION_SUCCESS = '[Speaker] Load Collection Success';

  loadCollectionSuccess(speakers: SpeakerModel[]): Action {
    return {
      type: SpeakerActions.LOAD_COLLECTION_SUCCESS,
      payload: speakers
    };
  }
}
