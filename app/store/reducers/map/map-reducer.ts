/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { ActionReducer, Action } from '@ngrx/store';
import { MapActions } from '../../actions/map-action';
import { MapState } from './map-state';
import { MapModel } from '../../../core/providers/map/map-model';

const defaultState: MapState = {
  loading: false,
  mapList: []
};

export const mapReducer: ActionReducer<MapState> = (state: MapState = defaultState, action: Action) => {
  switch (action.type) {
    case MapActions.LOAD_COLLECTION: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case MapActions.LOAD_COLLECTION_SUCCESS: {
      const maps: MapModel[] = action.payload;
      return Object.assign({}, state, {
        loading: false,
        mapList: maps
      });
    }

    default:
      return state;
  }
};
