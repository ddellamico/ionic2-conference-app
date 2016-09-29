/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Injectable } from '@angular/core';
import { Effect, StateUpdates } from '@ngrx/effects';
import { MapActions } from '../actions/map-action';
import { AppState } from '../reducers/index';
import { MapService } from '../../core/providers/map/map-service';
import { MapModel } from '../../core/providers/map/map-model';

@Injectable()
export class MapEffect {

  constructor(private updates$: StateUpdates<AppState>,
              private mapActions: MapActions,
              private mapService: MapService) {
  }

  @Effect() loadCollection$ = this.updates$
    .whenAction(MapActions.LOAD_COLLECTION)
    .switchMap(() => this.mapService.getMarkers())
    .map((maps: MapModel[]) => this.mapActions.loadCollectionSuccess(maps));
}
