/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { MapModel } from '../providers/map/map-model';

/**
 * Instead of passing around action string constants and manually recreating
 * action objects at the point of dispatch, we create services encapsulating
 * each appropriate action group. Action types are included as static
 * members and kept next to their action creator. This promotes a
 * uniform interface and single import for appropriate actions
 * within your application components.
 */
@Injectable()
export class MapActions {

  static LOAD_COLLECTION = '[Map] Load Collection';

  loadCollection(): Action {
    return {
      type: MapActions.LOAD_COLLECTION
    };
  }

  static LOAD_COLLECTION_SUCCESS = '[Map] Load Collection Success';

  loadCollectionSuccess(maps: MapModel[]): Action {
    return {
      type: MapActions.LOAD_COLLECTION_SUCCESS,
      payload: maps
    };
  }
}
