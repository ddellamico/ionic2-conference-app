/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { MapActions } from '../actions/map.action';
import { MapProvider } from '../../core/providers/map/map.provider';
import { MapModel } from '../../core/providers/map/map.model';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MapEffect {

  constructor(private actions$: Actions,
              private mapActions: MapActions,
              private mapService: MapProvider) {
  }

  @Effect()
  loadCollection$: Observable<Action> = this.actions$
    .ofType(MapActions.LOAD_COLLECTION)
    .switchMap(() => this.mapService.getMarkers())
    .map((maps: MapModel[]) => this.mapActions.loadCollectionSuccess(maps));
}
