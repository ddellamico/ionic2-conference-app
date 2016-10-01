/**
 * @mapor    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { MapActions } from '../../store/actions/map.action';
import { AppState } from '../../store/reducers/index';
import { MapSelector } from '../../store/selectors/map.selector';
import { MapModel } from '../providers/map/map.model';

@Injectable()
export class MapService {

  constructor(private store: Store<AppState>,
              private mapActions: MapActions) {
  }

  public dispachLoad() {
    this.store.dispatch(
      this.mapActions.loadCollection()
    );
  }

  public getMapItems(): Observable<MapModel[]> {
    return this.store.let(MapSelector.getMapItems());
  }

  public isLoading(): Observable<boolean> {
    return this.store.let(MapSelector.isLoading());
  }
}
